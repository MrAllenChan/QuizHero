package dao;

import exception.DaoException;
import model.File;
import model.Instructor;
import model.Quiz;
import model.Record;
import org.apache.commons.io.IOUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class QuizDaoTest {
    private FileDao fileDao;
    private InstructorDao instructorDao;
    private QuizDao quizDao;
    String fileId_1;
    String fileId_2;
    int instructorId_1;
    int instructorId_2;

    @Before
    public void setup() throws URISyntaxException, IOException {
        DaoFactory.connectDatabase();
        fileDao = DaoFactory.getFileDao();
        instructorDao = DaoFactory.getInstructorDao();
        quizDao = DaoFactory.getQuizDao();
        //add instructor to empty instructor table; this instructor has instructorId of 1
        Instructor jSmith = new Instructor("John Smith", "jsmith@jhu.edu", "jsmith");
        instructorDao.registerUser(jSmith);
        instructorId_1 = jSmith.getInstructorId();
        Instructor joeSmith = new Instructor("Joe Smith", "joesmith@jhu.edu", "jsmith");
        instructorDao.registerUser(joeSmith);
        instructorId_2 = joeSmith.getInstructorId();
        //add file to empty file table; this file has instructorId of 1 and fileId as String fileId
        InputStream inputStream = new FileInputStream("src/test/resources/test.md");
        File file_1 = new File(instructorId_1, "testFile", inputStream);
        fileDao.storeFile(file_1);
        File file_2 = new File(instructorId_2, "testFile", inputStream);
        fileDao.storeFile(file_2);
        inputStream.close();
        fileId_1 = file_1.getFileId();
        fileId_2 = file_2.getFileId();
    }

    @After
    public void clearTable() {
        DaoFactory.clearDatabase();
    }

    @Test
    public void addQuiz() {
        Quiz quiz = new Quiz(fileId_1, 1, "A", 0, 0, 0, 0);
        assertEquals(null, quizDao.getSingleQuizStat(fileId_1, 1));
        quizDao.add(quiz);
        assertEquals(quiz, quizDao.getSingleQuizStat(fileId_1, 1));
    }

    @Test
    public void getSingleQuizStat() {
        Quiz quiz1 = new Quiz(fileId_1, 1, "A", 0, 0, 0, 0);
        Quiz quiz2 = new Quiz(fileId_2, 1, "A", 0, 0, 0, 0);
        Quiz quiz3 = new Quiz(fileId_2, 2, "A", 0, 0, 0, 0);
        Quiz quiz4 = new Quiz(fileId_2, 3, "A", 0, 0, 0, 0);
        quizDao.add(quiz1);
        quizDao.add(quiz2);
        quizDao.add(quiz3);
        quizDao.add(quiz4);
        assertEquals(quiz4, quizDao.getSingleQuizStat(fileId_2, 3));
    }

    @Test
    public void getSingleQuizStatNonExistedFile() {
        Quiz quiz1 = new Quiz(fileId_1, 1, "A", 0, 0, 0, 0);
        quizDao.add(quiz1);
        //return null if fileId entered does not exist
        assertEquals(null, quizDao.getSingleQuizStat(fileId_1 + "wrong", 3));
    }

    @Test
    public void getQuizStatByFileId() {
        Quiz quiz1 = new Quiz(fileId_1, 1, "A", 0, 0, 0, 0);
        Quiz quiz2 = new Quiz(fileId_2, 1, "A", 0, 0, 0, 0);
        Quiz quiz3 = new Quiz(fileId_2, 2, "A", 0, 0, 0, 0);
        Quiz quiz4 = new Quiz(fileId_2, 3, "A", 0, 0, 0, 0);
        quizDao.add(quiz1);
        quizDao.add(quiz2);
        quizDao.add(quiz3);
        quizDao.add(quiz4);
        List<Quiz> list = new ArrayList<>();
        list.add(quiz2);
        list.add(quiz3);
        list.add(quiz4);
        assertEquals(list, quizDao.getQuizStatByFileId(fileId_2));
    }

    @Test
    public void getQuizStatWrongFileId() {
        Quiz quiz1 = new Quiz(fileId_1, 1, "A", 0, 0, 0, 0);
        Quiz quiz2 = new Quiz(fileId_2, 1, "A", 0, 0, 0, 0);
        Quiz quiz3 = new Quiz(fileId_2, 2, "A", 0, 0, 0, 0);
        Quiz quiz4 = new Quiz(fileId_2, 3, "A", 0, 0, 0, 0);
        quizDao.add(quiz1);
        quizDao.add(quiz2);
        quizDao.add(quiz3);
        quizDao.add(quiz4);
        List<Quiz> list = new ArrayList<>();
        assertEquals(list, quizDao.getQuizStatByFileId(fileId_2 + "wrong"));
    }

    @Test
    public void updateQuizStatOneRecord() {
        Quiz quiz1 = new Quiz(fileId_1, 1, "A", 0, 0, 0, 0);
        quizDao.add(quiz1);
        List<Quiz> list = new ArrayList<>();
        list.add(quiz1);
        assertEquals(list, quizDao.getQuizStatByFileId(fileId_1));

        Record record = new Record(fileId_1, 1, 'C');
        quizDao.updateQuizStat(record);
        Quiz quiz2 = new Quiz(fileId_1, 1, "A", 0, 0, 1, 0);
        List<Quiz> update = new ArrayList<>();
        list.add(quiz2);
        assertNotEquals(update, quizDao.getQuizStatByFileId(fileId_1));
    }

    @Test
    public void updateQuizStatMultipleRecords() {
        Quiz quiz1 = new Quiz(fileId_1, 1, "A", 0, 0, 0, 0);
        Quiz quiz2 = new Quiz(fileId_1, 2, "A", 0, 0, 0, 0);
        quizDao.add(quiz1);
        quizDao.add(quiz2);

        Record record1 = new Record(fileId_1, 1, 'C');
        Record record2 = new Record(fileId_1, 1, 'A');
        Record record3 = new Record(fileId_1, 2, 'D');
        Record record4 = new Record(fileId_1, 1, 'A');
        quizDao.updateQuizStat(record1);
        quizDao.updateQuizStat(record2);
        quizDao.updateQuizStat(record3);
        quizDao.updateQuizStat(record4);
        Quiz quiz1Update = new Quiz(fileId_1, 1, "A", 2, 0, 1, 0);
        Quiz quiz2Update = new Quiz(fileId_1, 2, "A", 0,0,0,1);
        List<Quiz> update = new ArrayList<>();
        update.add(quiz1Update);
        update.add(quiz2Update);
        assertEquals(update, quizDao.getQuizStatByFileId(fileId_1));
    }
}
