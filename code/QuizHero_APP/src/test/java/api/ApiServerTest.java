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

import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class ApiServerTest {

    private static Gson gson = new Gson();

    public ApiServerTest() throws URISyntaxException {
    }

    // start server
    @BeforeClass
    public static void beforeClass() throws Exception {
        DaoFactory.DROP_TABLES_IF_EXIST = true;
        ApiServer.INITIALIZE_WITH_SAMPLE_DATA = true;
        ApiServer.start();
    }

    // stop server
    @AfterClass
    public static void afterClass() {
        ApiServer.stop();
    }


    @Test
    public void getQuizStat() throws UnirestException {
        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileId", 1);
        quiz.put("questionId", 1);
        final String URL = "http://127.0.0.1:7000/quizstat/";
        HttpResponse<JsonNode> jsonResponse = Unirest.get(URL).queryString(quiz).asJson();
        assertEquals(200, jsonResponse.getStatus());
        assertNotEquals(0, jsonResponse.getBody().getArray().length());
    }

    @Test
    public void getQuizStatByFile() throws UnirestException {
        final String URL = "http://127.0.0.1:7000/quizstat/1";
        HttpResponse<JsonNode> jsonResponse = Unirest.get(URL).asJson();
        assertEquals(200, jsonResponse.getStatus());
        assertNotEquals(0, jsonResponse.getBody().getArray().length());
    }


    @Test
    public void getNotExistedQuizStatByFile() throws UnirestException {
        final String URL = "http://127.0.0.1:7000/quizstat/111";
        HttpResponse<JsonNode> jsonResponse = Unirest.get(URL).asJson();
        assertEquals(500, jsonResponse.getStatus());
    }

    @Test
    public void getQuizStatByFileAndQuestion() throws UnirestException {
        final String URL = "http://127.0.0.1:7000/quizstat/1/1";
        HttpResponse<JsonNode> jsonResponse = Unirest.get(URL).asJson();
        assertEquals(200, jsonResponse.getStatus());
        assertNotEquals(0, jsonResponse.getBody().getArray().length());
    }


    @Test
    public void getNotExistedQuizStatByFileAndQuestion() throws UnirestException {
        final String URL = "http://127.0.0.1:7000/quizstat/1/3";
        HttpResponse<JsonNode> jsonResponse = Unirest.get(URL).asJson();
        assertEquals(500, jsonResponse.getStatus());
    }

    @Test
    public void postQuizReturn201() throws UnirestException {
        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileId", 8080);
        quiz.put("questionId", 1);
        quiz.put("answer", "A");
        quiz.put("countA", 1);
        quiz.put("countB", 2);
        quiz.put("countC", 3);
        quiz.put("countD", 4);
        final String URL = "http://127.0.0.1:7000/quiz";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(quiz)).asJson();
        assertEquals(201, jsonResponse.getStatus());
    }

    @Test
    public void postQuizWithNoCountsReturn201() throws UnirestException {
        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileId", 8080);
        quiz.put("questionId", 2);
        quiz.put("answer", "A");
        final String URL = "http://127.0.0.1:7000/quiz";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(quiz)).asJson();
        assertEquals(201, jsonResponse.getStatus());
    }


    @Test
    public void postNullIdQuizReturn500() throws UnirestException {
        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileID", null);
        quiz.put("questionId", null);
        quiz.put("answer", "A");
        final String URL = "http://127.0.0.1:7000/quiz";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(quiz)).asJson();
        System.out.println(jsonResponse.getStatus());
        assertEquals(500, jsonResponse.getStatus());
    }

    @Test
    public void postRecordReturn201() throws UnirestException {
        Map<String, Object> record = new HashMap<>();
        record.put("fileId", 1);
        record.put("questionId", 1);
        record.put("choice", "A");
        final String URL = "http://127.0.0.1:7000/record";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(record)).asJson();
        assertEquals(201, jsonResponse.getStatus());
    }

    // quiz not found
    @Test
    public void postRecordReturn404() throws UnirestException {
        Map<String, Object> record = new HashMap<>();
        record.put("fileID", 8080);
        record.put("questionId", 88);
        record.put("answer", "A");
        final String URL = "http://127.0.0.1:7000/record";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(record)).asJson();
        assertEquals(404, jsonResponse.getStatus());
    }

    @Test
    public void loginReturn201() throws UnirestException {
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("email", "zchen85@jhu.edu");
        instructor.put("pswd", "9999");
        final String URL = "http://127.0.0.1:7000/login";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).queryString(instructor).asJson();
        assertEquals(201, jsonResponse.getStatus());
    }

    @Test
    public void loginReturn500() throws UnirestException {
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("email", "zchen85@jhu.edu");
        instructor.put("pswd", "0000");
        final String URL = "http://127.0.0.1:7000/login";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).queryString(instructor).asJson();
        assertEquals(500, jsonResponse.getStatus());
    }

    @Test
    public void registerReturn201() throws UnirestException {
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("name", "John Smith");
        instructor.put("email", "example@gmail.com");
        instructor.put("pswd", "qwer");
        final String URL = "http://127.0.0.1:7000/register";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(instructor)).asJson();
        assertEquals(201, jsonResponse.getStatus());
    }

    @Test
    public void registerReturn403() throws UnirestException {
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("name", "John Smith");
        instructor.put("email", "bob@jhu.edu");
        instructor.put("pswd", "qwer");
        final String URL = "http://127.0.0.1:7000/register";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(instructor)).asJson();
        assertEquals(403, jsonResponse.getStatus());
    }


    @Test
    public void registerNullEmailReturn500() throws UnirestException {
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("name", "John Smith");
        instructor.put("email", null);
        instructor.put("pswd", "qwer");
        final String URL = "http://127.0.0.1:7000/register";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(instructor)).asJson();
        assertEquals(500, jsonResponse.getStatus());
    }

    @Test
    public void registerNullPswdReturn500() throws UnirestException {
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("name", "John Smith");
        instructor.put("email", "js@gmail.com");
        instructor.put("pswd", null);
        final String URL = "http://127.0.0.1:7000/register";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(instructor)).asJson();
        assertEquals(500, jsonResponse.getStatus());
    }

    //test upload file and download file?

}
