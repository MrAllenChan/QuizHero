package dao;

import exception.LoginException;
import exception.RegisterException;
import model.File;
import model.Instructor;
import org.junit.Before;
import org.junit.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class InstructorDaoTest {
    private FileDao fileDao;
    private InstructorDao instructorDao;
    private QuizDao quizDao;
    private RecordDao recordDao;

    @Before
    public void setup() throws URISyntaxException {
        DaoFactory.instantiateSql2o();
        fileDao = DaoFactory.getFileDao();
        instructorDao = DaoFactory.getInstructorDao();
        quizDao = DaoFactory.getQuizDao();
        recordDao = DaoFactory.getRecordDao();
    }

    @Test
    public void checkUserExistNoException() {
        instructorDao.checkUserExist("jsmith@jhu.edu");
    }

    @Test
    public void registerNewUser() {
        Instructor jSmith = new Instructor("John Smith", "jsmith@jhu.edu", "jsmith");
        instructorDao.registerUser(jSmith);
        Integer correctId = 1;
        assertEquals(correctId, jSmith.getInstructorId());
    }

    @Test (expected = RegisterException.class)
    public void registerExistedUser() {
        Instructor jSmith = new Instructor("John Smith", "jsmith@jhu.edu", "jsmith");
        instructorDao.registerUser(jSmith);
        instructorDao.checkUserExist("jsmith@jhu.edu");
    }

    @Test
    public void userLoginSuccessfully() {
        Instructor jSmith = new Instructor("John Smith", "jsmith@jhu.edu", "jsmith");
        instructorDao.registerUser(jSmith);
        Instructor result;
        result = instructorDao.userLogin("jsmith@jhu.edu", "jsmith");
        assertEquals(jSmith.getInstructorId(),result.getInstructorId());
        assertEquals(jSmith.getName(), result.getName());
        assertEquals(jSmith.getEmail(), result.getEmail());
    }

    @Test (expected = LoginException.class)
    public void userLoginMistake() {
        Instructor jSmith = new Instructor("John Smith", "jsmith@jhu.edu", "jsmith");
        instructorDao.registerUser(jSmith);
        instructorDao.userLogin("jsmith@jhu.edu", "wrongpassword");
    }

    @Test
    public void emptyFileList() {
        Instructor jSmith = new Instructor("John Smith", "jsmith@jhu.edu", "jsmith");
        instructorDao.registerUser(jSmith);
        List<File> emptyFileList = new ArrayList<>();
        List<File> resultList = instructorDao.getUserFileList(jSmith.getInstructorId());
        assertEquals(emptyFileList, resultList);
    }

    @Test
    public void nonEmptyFileList() throws FileNotFoundException {
        Instructor jSmith = new Instructor("John Smith", "jsmith@jhu.edu", "jsmith");
        instructorDao.registerUser(jSmith);
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        File file1 = new File(1, "testFile", inputStream);
        File file2 = new File(1, "testFile", inputStream);
        fileDao.storeFile(file1);
        fileDao.storeFile(file2);
        List<File> fileList = new ArrayList<>();
        fileList.add(file1);
        fileList.add(file2);
        List<File> resultList = instructorDao.getUserFileList(jSmith.getInstructorId());
        // the returned fileList does not contain all file information, can only be compared as the following fields:
        assertEquals(fileList.get(0).getFileId(), resultList.get(0).getFileId());
        assertEquals(fileList.get(1).getFileId(), resultList.get(1).getFileId());
        assertEquals(fileList.get(0).getFileName(), resultList.get(0).getFileName());
        assertEquals(fileList.get(1).getFileName(), resultList.get(1).getFileName());
    }

}
