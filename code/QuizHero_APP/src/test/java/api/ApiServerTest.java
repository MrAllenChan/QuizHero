package api;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.GetRequest;
import dao.DaoFactory;
import dao.DaoUtil;
import exception.DaoException;
import io.javalin.http.UploadedFile;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.sql2o.Connection;
import org.sql2o.Sql2oException;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.lang.reflect.GenericArrayType;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class ApiServerTest {

    private static Gson gson = new Gson();
    private GetRequest fileId;

    public ApiServerTest() {
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
        DaoFactory.clearDatabase();
        ApiServer.stop();
    }

    @Test
    public void loginReturn201() throws UnirestException {
        //the following instructor info is initialized with "ApiServer.INITIALIZE_WITH_SAMPLE_DATA = true"
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("email", "zchen85@jhu.edu");
        instructor.put("pswd", "9999");
        final String URL = "http://127.0.0.1:7000/login";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(instructor).asJson();
        assertEquals(201, jsonResponse.getStatus());
    }

    @Test
    public void loginNonExistingUserReturn403() throws UnirestException {
        //the following instructor info does not exist
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("email", "nonExist@jhu.edu"); //non existing account
        instructor.put("pswd", "123456");
        final String URL = "http://127.0.0.1:7000/login";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(instructor).asJson();
        assertEquals(403, jsonResponse.getStatus());
    }

    @Test
    public void loginWrongPasswordReturn403() throws UnirestException {
        //the instructor password is wrong
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("email", "zchen85@jhu.edu");
        instructor.put("pswd", "123456"); //wrong password
        final String URL = "http://127.0.0.1:7000/login";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(instructor).asJson();
        assertEquals(403, jsonResponse.getStatus());
    }

    @Test
    public void registerReturn201() throws UnirestException {
        //Successfully register a new account
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("name", "John Smith");
        instructor.put("email", "example@js.com");
        instructor.put("pswd", "123456");
        final String URL = "http://127.0.0.1:7000/register";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(instructor)).asJson();
        assertEquals(201, jsonResponse.getStatus());
    }

    @Test
    public void registerReturn403() throws UnirestException {
        //The email address is already registered
        Map<String, Object> instructor = new HashMap<>();
        instructor.put("name", "John Smith");
        instructor.put("email", "zchen85@jhu.edu");
        instructor.put("pswd", "123456");
        final String URL = "http://127.0.0.1:7000/register";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(instructor)).asJson();
        assertEquals(403, jsonResponse.getStatus());
    }

    @Test
    public void uploadFileReturn201() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String URL = "http://127.0.0.1:7000/upload";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(file).asJson();
        assertEquals(201, jsonResponse.getStatus());
    }

    @Test
    public void uploadFileReturn400() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        //with undefined userId, server return 400 bad request
//        file.put("userId", "1");
        final String URL = "http://127.0.0.1:7000/upload";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(file).asJson();
        assertEquals(400, jsonResponse.getStatus());
    }


    @Test
    public void uploadFileReturn500() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "99");
        final String URL = "http://127.0.0.1:7000/upload";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(file).asJson();
        assertEquals(500, jsonResponse.getStatus());
    }

    @Test
    public void fetchFileReturn200() throws UnirestException {
        //upload test.md
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        System.out.println("result to string is :" + result);
        String seg[] = result.split("\"");
        String fileId = seg[7];
        System.out.println("fileId is : " + fileId);
        Map<String, Object> map = new HashMap<>();
        map.put("fileId", fileId);

//        test fetch file api
        final String URL = "http://127.0.0.1:7000/fetch";
        //use String class to workaround
        HttpResponse<String> jsonResponse = Unirest.get(URL)
                .queryString(map).asString();
        assertEquals(200, jsonResponse.getStatus());
        assertNotEquals(0, jsonResponse.getBody().length());
    }

    @Test
    public void fetchFileReturn400() throws UnirestException {
        //upload test.md
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        System.out.println("result to string is :" + result);
        String seg[] = result.split("\"");
        String fileId = seg[7];
        System.out.println("fileId is : " + fileId);
        Map<String, Object> map = new HashMap<>();
        //missing argument return 400
//        map.put("fileId", fileId);

//        test fetch file api
        final String URL = "http://127.0.0.1:7000/fetch";
        //use String class to workaround
        HttpResponse<String> jsonResponse = Unirest.get(URL)
                .queryString(map).asString();
        assertEquals(400, jsonResponse.getStatus());
    }

    @Test
    public void fetchFileReturn500() throws UnirestException {
        final String URL = "http://127.0.0.1:7000/fetch";
        HttpResponse<String> jsonResponse = Unirest.get(URL)
                .queryString("fileId", "wrong file id").asString();
        assertEquals(500, jsonResponse.getStatus());
    }

    @Test
    public void changeFilePermissionReturn201() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        Map<String, Object> map = new HashMap<>();
        map.put("fileId", fileId);
        map.put("permission", true);
        final String URL = "http://127.0.0.1:7000/filepermission";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(map).asJson();
        assertEquals(201, jsonResponse.getStatus());
    }

    @Test
    public void changeFilePermissionReturn400() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        Map<String, Object> map = new HashMap<>();
        map.put("fileId", fileId);
        //missing argument return 400
//        map.put("permission", true);
        final String URL = "http://127.0.0.1:7000/filepermission";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(map).asJson();
        assertEquals(400, jsonResponse.getStatus());
    }

    @Test
    public void checkFilePermissionReturn200() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        final String URL = "http://127.0.0.1:7000/filepermission";
        HttpResponse<String> jsonResponse = Unirest.get(URL)
                .queryString("fileId", fileId).asString();
        assertEquals(200, jsonResponse.getStatus());
        assertNotEquals(0, jsonResponse.getBody().length());
    }

    @Test
    public void checkFilePermissionReturn400() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        final String URL = "http://127.0.0.1:7000/filepermission";
        HttpResponse<JsonNode> jsonResponse = Unirest.get(URL)
                .header("fileId", "wrong id").asJson();
        assertEquals(400, jsonResponse.getStatus());
    }


    @Test
    public void getFileListFromInstructorReturn200() throws UnirestException {
        //upload test.md
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        Unirest.post(up).fields(file).asJson();

        final String URL = "http://127.0.0.1:7000/history";
        HttpResponse<JsonNode> jsonResponse = Unirest.get(URL)
                .queryString("instructorId", "1").asJson();
        assertEquals(200, jsonResponse.getStatus());
        assertNotEquals(0, jsonResponse.getBody().getArray().length());
    }

    @Test
    public void getFileListFromInstructorReturn400() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        Unirest.post(up).fields(file).asJson();

        final String URL = "http://127.0.0.1:7000/history";
        //empty query param
        Map<String, Object> map = new HashMap<>();
        HttpResponse<JsonNode> jsonResponse = Unirest.get(URL)
                .queryString(map).asJson();
        assertEquals(400, jsonResponse.getStatus());
    }

    @Test
    public void changeQuizPermissionReturn201() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        Map<String, Object> map = new HashMap<>();
        map.put("fileId", fileId);
        map.put("permission", true);
        final String URL = "http://127.0.0.1:7000/quizpermission";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(map).asJson();
        assertEquals(201, jsonResponse.getStatus());
    }

    @Test
    public void changeQuizPermissionReturn400() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        Map<String, Object> map = new HashMap<>();
        map.put("fileId", fileId);
        //missing argument return 400
//        map.put("permission", true);
        final String URL = "http://127.0.0.1:7000/quizpermission";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(map).asJson();
        assertEquals(400, jsonResponse.getStatus());
    }

    @Test
    public void checkQuizPermissionReturn200() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        final String URL = "http://127.0.0.1:7000/quizpermission";
        HttpResponse<String> jsonResponse = Unirest.get(URL)
                .queryString("fileId", fileId).asString();
        assertEquals(200, jsonResponse.getStatus());
        assertNotEquals(0, jsonResponse.getBody().length());
    }

    @Test
    public void checkQuizPermissionReturn400() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        final String URL = "http://127.0.0.1:7000/quizpermission";
        HttpResponse<JsonNode> jsonResponse = Unirest.get(URL)
                .header("fileId", "wrong id").asJson();
        assertEquals(400, jsonResponse.getStatus());
    }


    @Test
    public void deleteFileReturn201() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        Map<String, Object> map = new HashMap<>();
        map.put("fileId", fileId);
        final String URL = "http://127.0.0.1:7000/deletefile";
        HttpResponse<String> jsonResponse = Unirest.post(URL).fields(map).asString();
        assertEquals(201, jsonResponse.getStatus());
    }

    @Test
    public void deleteFileReturn400() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        Map<String, Object> map = new HashMap<>();
        //missing argument return 400
//        map.put("fileId", "wrong fileId");
        final String URL = "http://127.0.0.1:7000/deletefile";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(map).asJson();
        assertEquals(400, jsonResponse.getStatus());
    }

    @Test
    public void deleteFileReturn500() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        Map<String, Object> map = new HashMap<>();
        map.put("fileId", "wrong fileId");
        final String URL = "http://127.0.0.1:7000/deletefile";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL).fields(map).asJson();
        assertEquals(500, jsonResponse.getStatus());
    }

    @Test
    public void postRecordReturn201() throws UnirestException {
        //upload file to user
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();

        //get fileId
        String seg[] = result.split("\"");
        String fileId = seg[7];

        //add quiz
        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileId", fileId);
        quiz.put("questionId", 1);
        quiz.put("answer", "A");
        quiz.put("countA", 0);
        quiz.put("countB", 0);
        quiz.put("countC", 0);
        quiz.put("countD", 0);
        final String URL_quiz = "http://127.0.0.1:7000/quiz";
        HttpResponse<JsonNode> jsonResponse_1 = Unirest.post(URL_quiz)
                .body(gson.toJson(quiz)).asJson();
        assertEquals(201, jsonResponse_1.getStatus());

        //add record
        Map<String, Object> record = new HashMap<>();
        record.put("fileId", fileId);
        record.put("questionId", 1);
        record.put("choice", "A");
        final String URL = "http://127.0.0.1:7000/record";
        HttpResponse<JsonNode> jsonResponse_2 = Unirest.post(URL)
                .body(gson.toJson(record)).asJson();
        assertEquals(201, jsonResponse_2.getStatus());
    }

    @Test
    public void postRecordReturn500() throws UnirestException {
        //upload file to user
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();

        //get fileId
        String seg[] = result.split("\"");
        String fileId = seg[7];

        //add quiz
        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileId", fileId);
        quiz.put("questionId", 1);
        quiz.put("answer", "A");
        quiz.put("countA", 0);
        quiz.put("countB", 0);
        quiz.put("countC", 0);
        quiz.put("countD", 0);
        final String URL_quiz = "http://127.0.0.1:7000/quiz";
        HttpResponse<JsonNode> jsonResponse_1 = Unirest.post(URL_quiz)
                .body(gson.toJson(quiz)).asJson();
        assertEquals(201, jsonResponse_1.getStatus());

        //add record to wrong file id
        Map<String, Object> record = new HashMap<>();
        record.put("fileId", "wrong file id");
        record.put("questionId", 1);
        record.put("choice", "A");
        final String URL = "http://127.0.0.1:7000/record";
        HttpResponse<JsonNode> jsonResponse_2 = Unirest.post(URL)
                .body(gson.toJson(record)).asJson();
        assertEquals(500, jsonResponse_2.getStatus());
    }

    @Test
    public void postQuizReturn201() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileId", fileId);
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
    public void postQuizReturn500() throws UnirestException {
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileId", fileId);
        //missing argument return 500
//        quiz.put("questionId", 1);
        quiz.put("answer", "A");
        quiz.put("countA", 1);
        quiz.put("countB", 2);
        quiz.put("countC", 3);
        quiz.put("countD", 4);
        final String URL = "http://127.0.0.1:7000/quiz";
        HttpResponse<JsonNode> jsonResponse = Unirest.post(URL)
                .body(gson.toJson(quiz)).asJson();
        assertEquals(500, jsonResponse.getStatus());
    }  //non existing quiz (questionId fileId)

    @Test
    public void getQuizStatByFileIdReturn200() throws UnirestException {
        //add file
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        //add quiz
        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileId", fileId);
        quiz.put("questionId", 1);
        quiz.put("answer", "A");
        quiz.put("countA", 1);
        quiz.put("countB", 2);
        quiz.put("countC", 3);
        quiz.put("countD", 4);
        final String URL_quiz = "http://127.0.0.1:7000/quiz";
        HttpResponse<JsonNode> jsonResponse_1 = Unirest.post(URL_quiz)
                .body(gson.toJson(quiz)).asJson();
        assertEquals(201, jsonResponse_1.getStatus());

        //get quiz stat
        final String URL = "http://127.0.0.1:7000/quizstat";
        HttpResponse<JsonNode> jsonResponse_2 = Unirest.get(URL)
                .queryString("fileId", fileId).asJson();
        assertEquals(200, jsonResponse_2.getStatus());
        assertNotEquals(0, jsonResponse_2.getBody().getArray().length());
    }

    @Test
    public void getQuizStatByFileIdReturn400() throws UnirestException {
        //add file
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        //add quiz
        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileId", fileId);
        quiz.put("questionId", 1);
        quiz.put("answer", "A");
        quiz.put("countA", 1);
        quiz.put("countB", 2);
        quiz.put("countC", 3);
        quiz.put("countD", 4);
        final String URL_quiz = "http://127.0.0.1:7000/quiz";
        HttpResponse<JsonNode> jsonResponse_1 = Unirest.post(URL_quiz)
                .body(gson.toJson(quiz)).asJson();
        assertEquals(201, jsonResponse_1.getStatus());

        Map<String, Object> map = new HashMap<>();
        //missing argument return 400
//        map.put("fileId", fileId);
        //get quiz stat
        final String URL = "http://127.0.0.1:7000/quizstat";
        HttpResponse<JsonNode> jsonResponse_2 = Unirest.get(URL)
                .queryString(map).asJson();
        assertEquals(400, jsonResponse_2.getStatus());
    }

    @Test
    public void getQuizStatByFileIdReturn500() throws UnirestException {
        //add file
        File upload = new File("src/test/resources/test.md");
        Map<String, Object> file = new HashMap<>();
        file.put("file", upload);
        file.put("userId", "1");
        final String up = "http://127.0.0.1:7000/upload";
        String result = Unirest.post(up).fields(file).asObject(String.class).getBody();
        String seg[] = result.split("\"");
        String fileId = seg[7];

        //add quiz
        Map<String, Object> quiz = new HashMap<>();
        quiz.put("fileId", fileId);
        quiz.put("questionId", 1);
        quiz.put("answer", "A");
        quiz.put("countA", 1);
        quiz.put("countB", 2);
        quiz.put("countC", 3);
        quiz.put("countD", 4);
        final String URL_quiz = "http://127.0.0.1:7000/quiz";
        HttpResponse<JsonNode> jsonResponse_1 = Unirest.post(URL_quiz)
                .body(gson.toJson(quiz)).asJson();
        assertEquals(201, jsonResponse_1.getStatus());

        //get quiz stat at wrong fileId
        final String URL = "http://127.0.0.1:7000/quizstat";
        HttpResponse<JsonNode> jsonResponse_2 = Unirest.get(URL)
                .queryString("fileId", "wrong file id").asJson();
        assertEquals(500, jsonResponse_2.getStatus());
    }
}
