package api;

import com.google.gson.Gson;
import com.sun.tools.javac.util.DefinedBy;
import dao.CourseDao;
import dao.DaoFactory;
import dao.DaoUtil;
import dao.ReviewDao;
import exception.ApiError;
import exception.DaoException;
import io.javalin.Javalin;
import io.javalin.plugin.json.JavalinJson;
import model.Course;
import model.Review;
import  model.FileHelper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class ApiServer {

  public static boolean INITIALIZE_WITH_SAMPLE_DATA = true;
  public static int PORT = 7000;
  private static Javalin app;

  private ApiServer() {
    // This class is not meant to be instantiated!
  }

  public static void start() {
    CourseDao courseDao = DaoFactory.getCourseDao();
    ReviewDao reviewDao = DaoFactory.getReviewDao();

    if (INITIALIZE_WITH_SAMPLE_DATA) {
      DaoUtil.addSampleCourses(courseDao);
      DaoUtil.addSampleReviews(courseDao, reviewDao);
    }

    app = startJavalin();

    // Routing
    getHomepage();
    getCourses(courseDao);
    postCourses(courseDao);
    getReviewsForCourse(reviewDao);
    postReviewForCourse(reviewDao);
    getHTML();

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
    app.after(ctx -> {
      // run after all requests
      ctx.contentType("application/json");
    });
  }

  public static void stop() {
    app.stop();
  }

  private static Javalin startJavalin() {
    Gson gson = new Gson();
    JavalinJson.setFromJsonMapper(gson::fromJson);
    JavalinJson.setToJsonMapper(gson::toJson);

    return Javalin.create().start(PORT);
  }

  private static void getHomepage() {
    app.get("/", ctx -> ctx.result("CourseReVU RESTful API"));
  }

  private static void getCourses(CourseDao courseDao) {
    // handle HTTP Get request to retrieve all courses
    app.get("/12345456", ctx -> {
      List<Course> courses = courseDao.findAll();
      ctx.json(courses);
      ctx.status(200); // everything ok!
    });
  }

  private static void postCourses(CourseDao courseDao) {
    // client adds a course through HTTP POST request
    app.post("/courses", ctx -> {
      Course course = ctx.bodyAsClass(Course.class);
      try {
        courseDao.add(course);
        ctx.status(201); // created successfully
        ctx.json(course);
      } catch (DaoException ex) {
        throw new ApiError(ex.getMessage(), 500); // server internal error
      }
    });
  }

  private static void getReviewsForCourse(ReviewDao reviewDao) {
    // handle HTTP Get request to retrieve all reviews for a course
    app.get("/courses/:id/reviews", ctx -> {
      // TODO: implement me
      int courseId = Integer.parseInt(ctx.pathParam("id"));
      List<Review> reviews = reviewDao.findByCourseId(courseId);
      ctx.json(reviews);
      ctx.status(200);
    });
  }

  private static void postReviewForCourse(ReviewDao reviewDao) {
    // client adds a review for a course (given its id) using HTTP POST request
    app.post("/courses/:id/reviews", ctx -> {
      // TODO: implement me
      int courseId = Integer.parseInt(ctx.pathParam("id"));
      Review review = ctx.bodyAsClass(Review.class);
      if(courseId != review.getCourseId()){
        throw new ApiError("course id in the review not matched with course id " +
              "in the http request!", 400);}
      try{
        reviewDao.add(review);
        ctx.status(201);
        ctx.json(review);
      }catch(DaoException ex){
        throw new ApiError(ex.getMessage(),500);
      }
    });
  }


  private static void getHTML() {
    // client adds a review for a course (given its id) using HTTP POST request
    FileHelper file = new FileHelper(1,"");

    app.get("/gethtml", ctx -> {
      ctx.result("cdcdcd");
    });
  }


}
