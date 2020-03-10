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

    public static boolean INITIALIZE_WITH_SAMPLE_DATA = true;
    public static int PORT = 7001;
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

//        app.config.addStaticFiles("/public");
        app = Javalin.create(config -> {config.addStaticFiles("/public");
                                        config.enableCorsForAllOrigins();}).start(7001);
//                .addStaticFiles("/") // Other static assets, external to the ReactJS application
//                .addSinglePageRoot("/", "/public/index.html")   // Catch-all route for the single-page application;   // The ReactJS application
//                .enableCorsForAllOrigins();

        // Routing
//        getHomepage();
        getQuizStat(quizDao);
        postRecords(recordDao);

        startJavalin();
//        getReviewsForCourse(reviewDao);
//        postReviewForCourse(reviewDao);

        // Handle exceptions
        app.exception(ApiError.class, (exception, ctx) -> {
            ApiError err = (ApiError) exception;
            Map<String, Object> jsonMap = new HashMap<>();
            jsonMap.put("status", err.getStatus());
            jsonMap.put("errorMessage", err.getMessage());
            ctx.status(err.getStatus());
            ctx.json(jsonMap);
        });

        // runs after every request (even if an exception occurred)
//        app.after(ctx -> {
//            // run after all requests
//            ctx.contentType("application/json");
//        });
    }

    public static void stop() {
        app.stop();
    }

    private static void startJavalin() {
        Gson gson = new Gson();
        JavalinJson.setFromJsonMapper(gson::fromJson);
        JavalinJson.setToJsonMapper(gson::toJson);

//        app.start(PORT);
    }

    private static void getHomepage() {
        app.get("/", ctx -> ctx.result("Welcome to QuizHero!"));
    }

    private static void getQuizStat(QuizDao quizDao) {
        // handle HTTP Get request to retrieve all Quiz statistics
        app.get("/quizstat", ctx -> {
            List<Quiz> quizzes = quizDao.getQuizStat();
            ctx.json(quizzes);
            ctx.contentType("application/json");
            ctx.status(200); // everything ok!
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

//    private static void getReviewsForCourse(ReviewDao reviewDao) {
//        // handle HTTP Get request to retrieve all reviews for a course
//        app.get("/courses/:id/reviews", ctx -> {
//            // TODO: implement me
//            int courseId = Integer.parseInt(ctx.pathParam("id"));
//            List<Review> reviews = reviewDao.findByCourseId(courseId);
//            ctx.json(reviews);
//            ctx.status(200);
//        });
//    }
//
//    private static void postReviewForCourse(ReviewDao reviewDao) {
//        // client adds a review for a course (given its id) using HTTP POST request
//        app.post("/courses/:id/reviews", ctx -> {
//            // TODO: implement me
//            Review review = ctx.bodyAsClass(Review.class);
//            if (Integer.parseInt(ctx.pathParam("id")) != review.getCourseId()) {
//                throw new ApiError("course id in the review not matched with course id " +
//                        "in the http request!", 400);
//            }
//
//            try {
//                reviewDao.add(review);
//                ctx.status(201); // successfully created
//                ctx.json(review);
//            } catch (DaoException ex) {
//                throw new ApiError(ex.getMessage(), 500); // server internal error
//            }
//        });
//    }
}
