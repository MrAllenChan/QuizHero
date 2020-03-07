package api;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import dao.DaoFactory;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class ApiServerTest {

  private static Gson gson = new Gson();

  @BeforeClass
  public static void beforeClass() throws Exception {
    DaoFactory.DROP_TABLES_IF_EXIST = true;
    DaoFactory.PATH_TO_DATABASE_FILE = Paths.get("src", "test", "resources").toFile().getAbsolutePath()
        + "/db/Test.db";
    ApiServer.INITIALIZE_WITH_SAMPLE_DATA = true;
    ApiServer.start();
  }

  @AfterClass
  public static void afterClass() throws Exception {
    ApiServer.stop();
  }

  @Test
  public void getCoursesRequestReturns200() throws UnirestException {
    final String URL = "http://127.0.0.1:7000/courses";
    HttpResponse<JsonNode> jsonResponse = Unirest.get(URL).asJson();
    assertEquals(200, jsonResponse.getStatus());
  }

  @Test
  public void getCoursesRequestReturnsMultipleCourses() throws UnirestException {
    final String URL = "http://127.0.0.1:7000/courses";
    HttpResponse<JsonNode> jsonResponse = Unirest.get(URL).asJson();
    assertNotEquals(0, jsonResponse.getBody().getArray().length());
  }

  @Test
  public void postCoursesRequestReturns201() throws UnirestException {
    Map<String, Object> course = new HashMap<>();
    course.put("name", "test course");
    course.put("url", "test-course.com");

    final String URL = "http://127.0.0.1:7000/courses";
    HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
        .body(gson.toJson(course)).asJson();
    assertEquals(201, jsonResponse.getStatus());
  }

  @Test
  public void postCoursesWithNullNameReturns500() throws UnirestException {
    Map<String, Object> course = new HashMap<>();
    course.put("name", null);
    course.put("url", "test-course.com");

    final String URL = "http://127.0.0.1:7000/courses";
    HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
        .body(gson.toJson(course)).asJson();
    assertEquals(500, jsonResponse.getStatus());
  }

  @Test
  public void getReviewsRequestReturns200() throws UnirestException {
    // TODO: Implement me!
    final String URL = "http://127.0.0.1:7000/courses/1/reviews";
    HttpResponse<JsonNode> jsonResponse = Unirest.get(URL).asJson();
    assertEquals(200, jsonResponse.getStatus());
  }

  @Test
  public void getReviewsRequestReturnsMultipleReviews() throws UnirestException {
    // TODO: Implement me!
    final String URL = "http://127.0.0.1:7000/courses/1/reviews";
    HttpResponse<JsonNode> jsonResponse = Unirest.get(URL).asJson();
    assertNotEquals(0, jsonResponse.getBody().getArray().length());
  }

  @Test
  public void getReviewsForNonExistingCourseReturnsEmptyList() throws UnirestException {
    // TODO: Implement me!
    final String URL = "http://127.0.0.1:7000/courses/10/reviews";
    HttpResponse<JsonNode> jsonResponse = Unirest.get(URL).asJson();
    assertEquals(0,jsonResponse.getBody().getArray().length());
  }

  @Test
  public void postReviewRequestReturns201() throws UnirestException {
    // TODO: Implement me!
    Map<String, Object> review = new HashMap<>();
    review.put("rating", 5);
    review.put("courseId", 1);
    review.put("comment","Awful");


    final String URL = "http://127.0.0.1:7000/courses/1/reviews";
    HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
            .body(gson.toJson(review)).asJson();
    assertEquals(201, jsonResponse.getStatus());

  }

  @Test
  public void postReviewMisMatchIDReturns400() throws UnirestException {
    // E.g. try to post a review for course with id=1 but in the body of request
    //  the courseId is some number other than 1
    // TODO: Implement me!
    Map<String, Object> review = new HashMap<>();
    review.put("rating", 5);
    review.put("courseId", 2);
    review.put("comment","Awful");


    final String URL = "http://127.0.0.1:7000/courses/1/reviews";
    HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
            .body(gson.toJson(review)).asJson();
    assertEquals(400, jsonResponse.getStatus());
  }

  @Test
  public void postReviewForNonExistingCourseReturns500() throws UnirestException {
    // E.g. try to post a review for course that is not in the database
    // TODO: Implement me!
    Map<String, Object> review = new HashMap<>();
    review.put("rating", 5);
    review.put("courseId", 67);
    review.put("comment","Awful");


    final String URL = "http://127.0.0.1:7000/courses/67/reviews";
    HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
            .body(gson.toJson(review)).asJson();
    assertEquals(500, jsonResponse.getStatus());
  }
}
