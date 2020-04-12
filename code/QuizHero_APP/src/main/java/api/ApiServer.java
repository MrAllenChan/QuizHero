package api;
import com.google.gson.Gson;
import dao.*;
import exception.*;
import model.*;
import io.javalin.Javalin;
import io.javalin.plugin.json.JavalinJson;
import io.javalin.http.UploadedFile;
import org.apache.commons.io.FileUtils;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        UserDao userDao = DaoFactory.getUserDao();
        QuizDao quizDao = DaoFactory.getQuizDao();
        RecordDao recordDao = DaoFactory.getRecordDao();
        // add some sample data
        if (INITIALIZE_WITH_SAMPLE_DATA) {
            DaoUtil.addSampleQuizzes(quizDao);
            DaoUtil.addSampleUsers(userDao);
        }

        // Routing
        getHomepage();
        getAllQuizStat(quizDao);
        getQuizStatByFileId(quizDao);
        getSingleQuizStat(quizDao);
        postQuiz(quizDao);
        postRecords(recordDao);
        login(userDao);
        register(userDao);

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
            List<Quiz> quizzes = quizDao.getAllQuizStat();
            int fileId = Integer.parseInt(ctx.queryParam("fileId"));
            System.out.println("File id: " + fileId);
            List<Quiz> quizzesByFileId = quizDao.getQuizStatByFileId(fileId);
            ctx.json(quizzesByFileId);
            ctx.contentType("application/json");
            ctx.status(200); // everything ok!
        });
    }

    private static void getQuizStatByFileId(QuizDao quizDao) {
        // handle HTTP Get request to retrieve all Quiz statistics of a single file
        app.get("/quizstat/:fileid", ctx -> {
            // TODO: implement me
            int fileId = Integer.parseInt(ctx.pathParam("fileid"));
            List<Quiz> quizzes = quizDao.getQuizStatByFileId(fileId);
            ctx.json(quizzes);
            ctx.status(200);
        });
    }

    private static void getSingleQuizStat(QuizDao quizDao) {
        // handle HTTP Get request to retrieve statistics of a single question in a file
        app.get("/quizstat/:fileid/:questionid", ctx -> {
            // TODO: implement me
            int fileId = Integer.parseInt(ctx.pathParam("fileid"));
            int questionId = Integer.parseInt(ctx.pathParam("questionid"));
            List<Quiz> quizzes = quizDao.getSingleQuizStat(fileId, questionId);
            ctx.json(quizzes.get(0));
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
                ctx.status(201); // created successfully
                ctx.json(quiz);
                ctx.contentType("application/json");
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
                ctx.status(201); // created successfully
                ctx.json(record);
                ctx.contentType("application/json");
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 404); // quiz not found
            }
        });
    }

    private static void login(UserDao userDao) {
        // instructor login action, return user including his/her id
        app.post("/login", ctx -> {
            User user = ctx.bodyAsClass(User.class);
            try {
                int userId = userDao.checkUserIdentity(user);
                user.setUserId(userId);
                ctx.status(201); // created successfully
                ctx.json(user);
                ctx.contentType("application/json");
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            } catch (LoginException ex) {
                throw new ApiError(ex.getMessage(), 404); // user not find
            }
        });
    }

    private static void register(UserDao userDao) {
        // instructor login action, return user including his/her id
        app.post("/register", ctx -> {
            User user = ctx.bodyAsClass(User.class);
            try {
                userDao.registerUser(user);
                ctx.status(201); // created successfully
                ctx.json(user);
                ctx.contentType("application/json");
            } catch (DaoException ex) {
                throw new ApiError(ex.getMessage(), 500); // server internal error
            } catch (RegisterException ex) {
                throw new ApiError(ex.getMessage(), 403); // request forbidden, user already exists
            }
        });
    }

//    private static void upload(UserDao userDao) {
//        // instructor login action, return user including his/her id
//        app.post("/upload", ctx -> {
//            User user = ctx.bodyAsClass(User.class);
//            try {
//                userDao.uploadFile(user.getUserId(), );
//                ctx.status(201); // created successfully
//                ctx.json(user);
//                ctx.contentType("application/json");
//            } catch (DaoException ex) {
//                throw new ApiError(ex.getMessage(), 500); // server internal error
//            }
//        });
//    }

    // Upload a file and save it to the local file system
    private static void uploadFile(UserDao userDao) {
        app.post("/upload", context -> {
            UploadedFile uploadedFile = context.uploadedFile("file");
            try (InputStream inputStream = uploadedFile.getContent()) {
                File localFile = new File(uploadedFile.getFilename());
                FileUtils.copyInputStreamToFile(inputStream, localFile);
                String url = localFile.getAbsolutePath();
//                userDao.storeUserFileInfo();
            }
        });
    }

    // Download the specified file
    private static void downloadFile(UserDao userDao) {
        app.get("/download/:name", context -> {
            File localFile = new File(context.pathParam("name"));
            InputStream inputStream = new BufferedInputStream(new FileInputStream(localFile));
            context.header("Content-Disposition", "attachment; filename=\"" + localFile.getName() + "\"");
            context.header("Content-Length", String.valueOf(localFile.length()));
            context.result(inputStream);
        });
    }

    private static void startJavalin() {
        Gson gson = new Gson();
        JavalinJson.setFromJsonMapper(gson::fromJson);
        JavalinJson.setToJsonMapper(gson::toJson);
        app.start(PORT);
    }
}
