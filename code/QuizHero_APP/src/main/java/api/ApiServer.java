package api;
import com.google.gson.Gson;
import dao.DaoFactory;
import dao.DaoUtil;
import dao.QuizDao;
import dao.RecordDao;
import exception.ApiError;
import exception.DaoException;
import io.javalin.Javalin;
import io.javalin.plugin.json.JavalinJson;
import model.Quiz;
import model.Record;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class ApiServer {

    public static boolean INITIALIZE_WITH_SAMPLE_DATA = false;
    public static int PORT = 7000;
    private static Javalin app;

    private ApiServer() {
        // This class is not meant to be instantiated!
    }

    public static void start() {
        QuizDao quizDao = DaoFactory.getQuizDao();
        RecordDao recordDao = DaoFactory.getRecordDao();

        // add some sample data
        if (INITIALIZE_WITH_SAMPLE_DATA) {
            DaoUtil.addSampleQuizzes(quizDao);
        }

        // Routing
        getHomepage();
        getAllQuizStat(quizDao);
        getQuizStatByFileId(quizDao);
        getSingleQuizStat(quizDao);
        postRecords(recordDao);

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
        // handle HTTP Get request to retrieve all Quiz statistics of a single file
        app.get("/quizstat/:fileid/:questionid", ctx -> {
            // TODO: implement me
            int fileId = Integer.parseInt(ctx.pathParam("fileid"));
            int questionId = Integer.parseInt(ctx.pathParam("questionid"));
            List<Quiz> quizzes = quizDao.getSingleQuizStat(fileId, questionId);
            ctx.json(quizzes.get(0));
            ctx.status(200);
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
                throw new ApiError(ex.getMessage(), 500); // server internal error
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
