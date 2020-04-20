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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public final class ApiServer {

    public static boolean INITIALIZE_WITH_SAMPLE_DATA = true;
//    public static int PORT = 7000;
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
        // choose to initialize database or not, get Daos
        DaoFactory.clearDatabase();
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

//        runs after every request (even if an exception occurred)
//        app.after(ctx -> {
//            // run after all requests
//            ctx.contentType("application/json");
//        });
    }

    public static void stop() {
        app.stop();
    }

    private static void routing(FileDao fileDao, InstructorDao instructorDao, QuizDao quizDao, RecordDao recordDao) {
        getAllQuizStat(quizDao);
        getQuizStatByFileId(quizDao);
        getSingleQuizStat(quizDao);

        postQuiz(quizDao);
        postRecords(recordDao);

        login(instructorDao);
        register(instructorDao);

        uploadFile(instructorDao, fileDao);
        fetchFile(fileDao);
        changeFilePermission(fileDao);
        checkFilePermission(fileDao);
        //changeQuizPermission(fileDao);
        //checkQuizPermission(fileDao);
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

        // app.get("/", ctx -> ctx.result("Welcome to QuizHero!"));
    }

    private static void getAllQuizStat(QuizDao quizDao) {
        // handle HTTP Get request to retrieve all Quiz statistics
        app.get("/quizstat", ctx -> {
            if (ctx.queryParam("fileId") != null) {
                int fileId = Integer.parseInt(ctx.queryParam("fileId"));
                System.out.println("File id: " + fileId);
                List<Quiz> quizzesByFileId = quizDao.getQuizStatByFileId(fileId);
                ctx.json(quizzesByFileId);
            }
            else {
                List<Quiz> quizzes = quizDao.getAllQuizStat();
                ctx.json(quizzes);
            }
            ctx.contentType("application/json");
            ctx.status(200); // everything ok!
        });
    }

    private static void getQuizStatByFileId(QuizDao quizDao) {
        // handle HTTP Get request to retrieve all Quiz statistics of a single file
        app.get("/quizstat/:fileid", ctx -> {
            int fileId = Integer.parseInt(ctx.pathParam("fileid"));
            List<Quiz> quizzes = quizDao.getQuizStatByFileId(fileId);
            if (quizzes.isEmpty()) {
                throw new ApiError("Unable to find quizzes", 500);
            }
            ctx.json(quizzes);
            ctx.status(200);
        });
    }

    private static void getSingleQuizStat(QuizDao quizDao) {
        // handle HTTP Get request to retrieve statistics of a single question in a file
        app.get("/quizstat/:fileid/:questionid", ctx -> {
            int fileId = Integer.parseInt(ctx.pathParam("fileid"));
            int questionId = Integer.parseInt(ctx.pathParam("questionid"));
            Quiz quiz = quizDao.getSingleQuizStat(fileId, questionId);
            if (quiz == null) {
                throw new ApiError("Unable to find quiz", 500);
            }
            ctx.json(quiz);
            ctx.status(200);
        });
    }

    // add postQuiz method
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
                throw new ApiError(ex.getMessage(), 500);
            }
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
                throw new ApiError(ex.getMessage(), 404); // quiz not found
            }
        });
    }

    private static void login(InstructorDao instructorDao) {
        // instructor login action, return user including his/her id
        app.post("/login", ctx -> {
//            String email = ctx.queryParam("email");
//            String pswd = ctx.queryParam("pswd");
            String email = ctx.formParam("email");
            String pswd = ctx.formParam("pswd");
//            System.out.println("email: " + email + " pswd: " + pswd);
            try {
                Instructor instructor = instructorDao.checkUserIdentity(email, pswd);
                ctx.json(instructor);
                ctx.contentType("application/json");
                ctx.status(201); // created successfully
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            } catch (LoginException ex) {
                throw new ApiError(ex.getMessage(), 500); // user not found
            }
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
            // fetch user id from form-data, if no key then return -1 as default
            int userId = Integer.parseInt(context.formParam("userId", "-1"));
            System.out.println("user id: " + userId);

            // get file part
            UploadedFile uploadedFile = context.uploadedFile("file");
            try (InputStream inputStream = uploadedFile.getContent()) {
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
                context.json(fileMap);
                context.contentType("application/json");
                context.status(201);

            } catch (NullPointerException npEx) {
                throw new ApiError("file upload error: " + npEx.getMessage(), 400); // client bad request
            } catch (DaoException daoEx) {
                throw new ApiError("database error: " + daoEx.getMessage(), 500);
            }
        });
    }

    // front-end fetches the specified file
    private static void fetchFile(FileDao fileDao) {
        app.get("/fetch", context -> {
            int fileId = Integer.parseInt(context.queryParam("fileId")); // get file id from form-data
            System.out.println(fileId);
            try {
//                File localFile = new File("upload/tempory.md");
//                FileUtils.copyInputStreamToFile(in, localFile);
//                File localFile = new File(fileUrl); // create file object, passed into FileInputStream(File)
//                InputStream inputStream = new BufferedInputStream(new FileInputStream(localFile));
//                System.out.println("find local file.");
//                context.header("Content-Disposition", "attachment; filename=\"" + localFile.getName() + "\"");
//                context.header("Content-Length", String.valueOf(localFile.length()));
                InputStream in = fileDao.getFile(fileId);
                InputStream inputStream = new BufferedInputStream(in); /* BufferedInputStream is used to improve the performance of the inside InputStream */
                context.result(inputStream);
                System.out.println("Send file successfully.");
                context.status(200);
            } catch (DaoException ex) {
                throw new ApiError("file not found! " + ex.getMessage(), 400); // bad request
            }
        });
    }

    private static void changeFilePermission(FileDao fileDao) {
        // instructor login action, return user including his/her id
        app.post("/filepermission", ctx -> {
            Integer fileId = Integer.parseInt(ctx.formParam("fileId"));
            Boolean permission = Boolean.parseBoolean(ctx.formParam("permission"));
            System.out.println("fileId: " + fileId + " permission: " + permission);
            try {
                fileDao.changeFilePermission(fileId, permission);
                ctx.status(201); // created successfully
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            }
        });
    }

    private static void checkFilePermission(FileDao fileDao) {
        // instructor login action, return user including his/her id
        app.get("/filepermission", ctx -> {
            Integer fileId = Integer.parseInt(ctx.queryParam("fileId"));
            System.out.println("fileId: " + fileId);
            try {
                Boolean permission = fileDao.checkFilePermission(fileId);
//                ctx.json(permission);
                ctx.result(String.valueOf(permission));
                ctx.status(200); // created successfully
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            }
        });
    }

    private static void getFileListFromInstructor(InstructorDao instructorDao) {
        app.get("/history", ctx -> {
            List<File> fileHistory;
            int userId = Integer.parseInt(ctx.queryParam("instructorId"));
            try {
                fileHistory = instructorDao.getUserFileList(userId);
                System.out.println(fileHistory.size());
                ctx.json(fileHistory);
                ctx.status(200);
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500);
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
