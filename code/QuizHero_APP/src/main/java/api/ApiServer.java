package api;
import com.google.gson.Gson;
import dao.*;
import exception.*;
import model.*;
import io.javalin.Javalin;
import io.javalin.plugin.json.JavalinJson;
import io.javalin.http.UploadedFile;
import model.File;

import java.io.*;

import java.net.URISyntaxException;
import java.util.*;

public final class ApiServer {

    public static boolean INITIALIZE_WITH_SAMPLE_DATA = true;
    public static int PORT = getHerokuAssignedPort();
    private static Javalin app;

    private ApiServer() {
        // This class is not meant to be instantiated!
    }

    private static int getHerokuAssignedPort() {
        String herokuPort = System.getenv("PORT");
        if (herokuPort != null) {
            return Integer.parseInt(herokuPort);
        }
        return 7000;
    }

    public static void start() throws URISyntaxException{
        // instantiate Sql2o and get DAOs
        DaoFactory.instantiateSql2o();
        FileDao fileDao = DaoFactory.getFileDao();
        InstructorDao instructorDao = DaoFactory.getInstructorDao();
        QuizDao quizDao = DaoFactory.getQuizDao();
        RecordDao recordDao = DaoFactory.getRecordDao();

        // add some sample data
        if (INITIALIZE_WITH_SAMPLE_DATA) {
            DaoUtil.addSampleUsers(instructorDao);
            DaoUtil.addSampleQuizzes(quizDao);
            DaoUtil.addSampleUserFiles(instructorDao);
        }

        // Routing
        getHomepage();
        routing(fileDao, instructorDao, quizDao, recordDao);

        // start application server
        startJavalin();

        // Handle exceptions
        app.exception(ApiError.class, (exception, ctx) -> {
            ApiError err = (ApiError) exception;
            Map<String, Object> jsonMap = new HashMap<>();
            jsonMap.put("status", err.getStatus());
            jsonMap.put("errorMessage", err.getMessage());
            ctx.status(err.getStatus());
            ctx.json(jsonMap);
        });
    }

    public static void stop() {
        app.stop();
    }

    private static void routing(FileDao fileDao, InstructorDao instructorDao, QuizDao quizDao, RecordDao recordDao) {
        // fetch quiz statistics
        getQuizStatByFileId(quizDao);

        // update quiz statistics
        postQuiz(quizDao);
        postRecords(recordDao);

        // login and register
        login(instructorDao);
        register(instructorDao);

        // upload, fetch file content and modify file status
        uploadFile(instructorDao, fileDao);
        fetchFile(fileDao);
        changeFilePermission(fileDao);
        checkFilePermission(fileDao);
        changeQuizPermission(fileDao);
        checkQuizPermission(fileDao);
        getFileListFromInstructor(instructorDao);
    }

    private static void getHomepage() {
        // Catch-all route for the single-page application;
        // The ReactJS application
        app = Javalin.create(config -> {
            config.addStaticFiles("/public");
            config.enableCorsForAllOrigins();
            config.addSinglePageRoot("/", "/public/index.html");
        });
    }

    private static void getQuizStatByFileId(QuizDao quizDao) {
        // handle HTTP Get request to retrieve Quiz statistics
        app.get("/quizstat", ctx -> {
            try {
                int fileId = Integer.parseInt(Objects.requireNonNull(ctx.queryParam("fileId")));
                System.out.println("File id: " + fileId);
                List<Quiz> quizzesByFileId = quizDao.getQuizStatByFileId(fileId);
                if (quizzesByFileId.isEmpty()) {
                    throw new ApiError("Unable to find quizzes", 500);
                }
                ctx.json(quizzesByFileId);
                ctx.status(200); // everything ok!
            } catch (NullPointerException ex) {
                throw new ApiError("bad request with missing argument: " + ex.getMessage(), 400);
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500);
            }

        });
    }

//    private static void getSingleQuizStat(QuizDao quizDao) {
//        // handle HTTP Get request to retrieve statistics of a single question in a file
//        app.get("/quizstat/:fileid/:questionid", ctx -> {
//            int fileId = Integer.parseInt(ctx.pathParam("fileid"));
//            int questionId = Integer.parseInt(ctx.pathParam("questionid"));
//            Quiz quiz = quizDao.getSingleQuizStat(fileId, questionId);
//            if (quiz == null) {
//                throw new ApiError("Unable to find quiz", 500);
//            }
//            ctx.json(quiz);
//            ctx.status(200);
//        });
//    }

    private static void postQuiz(QuizDao quizDao) {
        // quizzes are initialized once a markdown in quiz format is uploaded
        app.post("/quiz", ctx -> {
            Quiz quiz = ctx.bodyAsClass(Quiz.class);
            try {
                quizDao.add(quiz);
                ctx.json(quiz);
                ctx.contentType("application/json");
                ctx.status(201); // created successfully
            } catch (DaoException ex) {
                throw new ApiError("database error: " + ex.getMessage(), 500);
            } // quiz already exists, request forbidden
        });
    }

    private static void postRecords(RecordDao recordDao) {
        // student adds a record of a Quiz question through HTTP POST request
        app.post("/record", ctx -> {
            Record record = ctx.bodyAsClass(Record.class);
            try {
                recordDao.add(record);
                ctx.json(record);
                ctx.contentType("application/json");
                ctx.status(201); // created successfully
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500);
            } // quiz not found
        });
    }

    private static void login(InstructorDao instructorDao) {
        // instructor login action, return user including his/her id
        app.post("/login", ctx -> {
            String email = ctx.formParam("email");
            String pswd = ctx.formParam("pswd");
            try {
                Instructor instructor = instructorDao.checkUserIdentity(email, pswd);
                ctx.json(instructor);
                ctx.contentType("application/json");
                ctx.status(201); // created successfully
            } catch (DaoException | LoginException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            } // user not found

        });
    }

    private static void register(InstructorDao instructorDao) {
        // instructor login action, return user including his/her id
        app.post("/register", ctx -> {
            Instructor instructor = ctx.bodyAsClass(Instructor.class);
            try {
                instructorDao.registerUser(instructor);
                ctx.json(instructor);
                ctx.contentType("application/json");
                ctx.status(201); // created successfully
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            } catch (RegisterException ex) {
                throw new ApiError(ex.getMessage(), 403); // request forbidden, user already exists
            }
        });
    }

    // Upload a file and save it to the local file system
    private static void uploadFile(InstructorDao instructorDao, FileDao fileDao) {
        app.post("/upload", context -> {
            // get file part
            UploadedFile uploadedFile = context.uploadedFile("file");
            try (InputStream inputStream = Objects.requireNonNull(uploadedFile).getContent()) {
                // fetch user id from form-data, if no key then return -1 as default
                int userId = Integer.parseInt(Objects.requireNonNull(context.formParam("userId")));
                System.out.println("user id: " + userId);
                String fileName = uploadedFile.getFilename();
                System.out.println("file content received. File name: " + fileName);
//                File localFile = new File("upload/" + uploadedFile.getFilename());
//                FileUtils.copyInputStreamToFile(inputStream, localFile);
//                String url = localFile.getAbsolutePath();
//                System.out.println("url: " + url);

                // generate file id
                int fileId = new Random().nextInt(100000);
                System.out.println("file id: " + fileId);
                // store user-file info into database
                File file = new File (fileId, fileName, inputStream);
                fileDao.storeFile(file);
                instructorDao.storeUserFileInfo(userId, fileId);
                // return fileId to front-end
                Map<String, Object> fileMap = new HashMap<>();
                fileMap.put("fileId", fileId);
                fileMap.put("fileName", fileName);
                context.json(fileMap);
                context.contentType("application/json");
                context.status(201);
            } catch (NullPointerException ex) {
                throw new ApiError("bad request with missing argument: " + ex.getMessage(), 400); // client bad request
            } catch (DaoException ex) {
                throw new ApiError("database error: " + ex.getMessage(), 500);
            }
        });
    }

    // front-end fetches the specified file
    private static void fetchFile(FileDao fileDao) {
        app.get("/fetch", context -> {
            try {
                int fileId = Integer.parseInt(Objects.requireNonNull(context.queryParam("fileId"))); // get file id from form-data
                System.out.println("file id: " + fileId);
                InputStream in = fileDao.getFile(fileId);
                InputStream inputStream = new BufferedInputStream(in); /* BufferedInputStream is used to improve the performance of the inside InputStream */
                context.result(inputStream);
                System.out.println("Send file successfully.");
                context.status(200);
            } catch (DaoException ex) {
                throw new ApiError("server error when fetching file: " + ex.getMessage(), 500); // bad request
            } catch (NullPointerException ex) {
                throw new ApiError("bad request with missing argument: " + ex.getMessage(), 400);
            }
        });
    }

    private static void changeFilePermission(FileDao fileDao) {
        // instructor login action, return user including his/her id
        app.post("/filepermission", ctx -> {
            try {
                int fileId = Integer.parseInt(Objects.requireNonNull(ctx.formParam("fileId")));
                boolean permission = Boolean.parseBoolean(Objects.requireNonNull(ctx.formParam("permission")));
                System.out.println("fileId: " + fileId + " file permission: " + permission);
                fileDao.changeFilePermission(fileId, permission);
                ctx.status(201); // created successfully
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            } catch (NullPointerException ex) {
                throw new ApiError("bad request with missing argument: " + ex.getMessage(), 400);
            }
        });
    }

    private static void checkFilePermission(FileDao fileDao) {
        // instructor login action, return user including his/her id
        app.get("/filepermission", ctx -> {
            try {
                int fileId = Integer.parseInt(Objects.requireNonNull(ctx.queryParam("fileId")));
                System.out.println("fileId: " + fileId);
                Boolean filePermission = fileDao.checkFilePermission(fileId);
                ctx.result(String.valueOf(filePermission));
                ctx.status(200);
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            } catch (NullPointerException ex) {
                throw new ApiError("bad request with missing argument: " + ex.getMessage(), 400);
            }
        });
    }

    private static void getFileListFromInstructor(InstructorDao instructorDao) {
        app.get("/history", ctx -> {
            try {
                int userId = Integer.parseInt(Objects.requireNonNull(ctx.queryParam("instructorId")));
                List<File> fileHistory = instructorDao.getUserFileList(userId);
                System.out.println(fileHistory.size());
                ctx.json(fileHistory);
                ctx.status(200);
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            } catch (NullPointerException ex) {
                throw new ApiError("bad request with missing argument: " + ex.getMessage(), 400);
            }
        });
    }

    private static void changeQuizPermission(FileDao fileDao) {
        // instructor login action, return user including his/her id
        app.post("/quizpermission", ctx -> {
            try {
                int fileId = Integer.parseInt(Objects.requireNonNull(ctx.formParam("fileId")));
                boolean permission = Boolean.parseBoolean(Objects.requireNonNull(ctx.formParam("permission")));
                System.out.println("fileId: " + fileId + " quiz permission: " + permission);
                fileDao.changeQuizPermission(fileId, permission);
                ctx.status(201); // created successfully
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            } catch (NullPointerException ex) {
                throw new ApiError("bad request with missing argument: " + ex.getMessage(), 400);
            }
        });
    }

    private static void checkQuizPermission(FileDao fileDao) {
        // instructor login action, return user including his/her id
        app.get("/quizpermission", ctx -> {
            try {
                int fileId = Integer.parseInt(Objects.requireNonNull(ctx.queryParam("fileId")));
                System.out.println("fileId: " + fileId);
                Boolean quizPermission = fileDao.checkQuizPermission(fileId);
                ctx.result(String.valueOf(quizPermission));
                ctx.status(200);
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            } catch (NullPointerException ex) {
                throw new ApiError("bad request with missing argument: " + ex.getMessage(), 400);
            }
        });
    }

    private static void startJavalin() {
        Gson gson = new Gson();
        JavalinJson.setFromJsonMapper(gson::fromJson);
        JavalinJson.setToJsonMapper(gson::toJson);
        app.start(PORT);
    }
}
