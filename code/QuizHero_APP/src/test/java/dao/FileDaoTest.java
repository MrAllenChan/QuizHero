package dao;

import exception.DaoException;
import model.File;
import model.Instructor;
import org.apache.commons.io.IOUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.sql2o.Sql2oException;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class FileDaoTest {
    private FileDao fileDao;
    private InstructorDao instructorDao;
    private QuizDao quizDao;
    int instructorId;

    @Before
    public void setup() throws URISyntaxException {
        DaoFactory.connectDatabase();
        fileDao = DaoFactory.getFileDao();
        instructorDao = DaoFactory.getInstructorDao();
        quizDao = DaoFactory.getQuizDao();
        //add instructor to empty instructor table; this instructor has instructorId of 1
        Instructor jSmith = new Instructor("John Smith", "jsmith@jhu.edu", "jsmith");
        instructorDao.registerUser(jSmith);
        instructorId = jSmith.getInstructorId();
    }

    @After
    public void clearTable() {
        DaoFactory.clearDatabase();
    }

    @Test
    public void getFile() throws IOException {
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        //can not compare two inputStream directly?
        //can not open two input stream and IOUtils.toString?
//        String originFile = IOUtils.toString(inputStream, StandardCharsets.UTF_8.name());
        String originFile = "This is a markdown file for testing purpose.";
        File file = new File(instructorId, "testFile", inputStream);
        fileDao.storeFile(file);
        inputStream.close();
        String fileId = file.getFileId();
        InputStream resultStream = fileDao.getFile(fileId);
        String resultFile = IOUtils.toString(resultStream, StandardCharsets.UTF_8.name());
        resultStream.close();
        assertEquals(originFile, resultFile);
    }

    @Test(expected = DaoException.class)
    public void getWrongFile() throws IOException {
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        File file = new File(instructorId, "testFile", inputStream);
        fileDao.storeFile(file);
        inputStream.close();
        String fileId = file.getFileId();
        String wrongFileId = fileId + "wrong";
        InputStream resultStream = fileDao.getFile(wrongFileId);
        resultStream.close();
    }

    @Test
    public void storeAndCheckPermission() throws IOException {
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        File file = new File(instructorId, "testFile", inputStream);
        String fileId = file.getFileId();
        List<File> fileList = new ArrayList<>();
        assertEquals(fileList, instructorDao.getUserFileList(instructorId));
        fileDao.storeFile(file);
        fileDao.checkFileExist(fileId);
        fileList.add(file);
        assertEquals(fileList.get(0).getFileId(), instructorDao.getUserFileList(instructorId).get(0).getFileId());
        assertEquals(fileList.get(0).getFileName(), instructorDao.getUserFileList(instructorId).get(0).getFileName());
        inputStream.close();
    }

    @Test (expected = DaoException.class)
    public void checkNonExistedFilePermission() throws IOException {
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        File file = new File(instructorId, "testFile", inputStream);
        String fileId = file.getFileId();
        String wrongId = fileId + "wrong";
        fileDao.storeFile(file);
        fileDao.checkFileExist(wrongId);
        inputStream.close();
    }

    @Test
    public void changeFilePermission() throws IOException {
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        File file = new File(instructorId, "testFile", inputStream);
        String fileId = file.getFileId();
        fileDao.storeFile(file);
        assertEquals(false, fileDao.checkFilePermission(fileId));
        fileDao.changeFilePermission(fileId, true);
        assertEquals(true, fileDao.checkFilePermission(fileId));
        inputStream.close();
    }

    @Test (expected = DaoException.class)
    public void changeNotExistedFilePermission() throws IOException {
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        File file = new File(instructorId, "testFile", inputStream);
        String fileId = file.getFileId();
        fileDao.storeFile(file);
        fileDao.changeFilePermission(fileId + "wrong", true);
        inputStream.close();
    }

    @Test
    public void changeQuizPermission() throws IOException {
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        File file = new File(instructorId, "testFile", inputStream);
        String fileId = file.getFileId();
        fileDao.storeFile(file);
        assertEquals(false, fileDao.checkQuizPermission(fileId));
        fileDao.changeQuizPermission(fileId, true);
        assertEquals(true, fileDao.checkQuizPermission(fileId));
        inputStream.close();
    }

    @Test (expected = DaoException.class)
    public void changeNotExistedQuizPermission() throws IOException {
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        File file = new File(instructorId, "testFile", inputStream);
        String fileId = file.getFileId();
        fileDao.storeFile(file);
        fileDao.changeQuizPermission(fileId + "wrong", true);
        inputStream.close();
    }

    @Test
    public void deleteFile() throws FileNotFoundException {
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        File file = new File(instructorId, "testFile", inputStream);
        String fileId = file.getFileId();
        List<File> emptyList = new ArrayList<>();
        fileDao.storeFile(file); //store file
        fileDao.deleteFile(fileId); //delete file
        //getUserFileList return empty list
        assertEquals(emptyList, instructorDao.getUserFileList(1));
        //get quiz list return empty list
        assertEquals(emptyList, quizDao.getQuizStatByFileId(fileId));
    }

}
