package dao;

import dao.FileDao;
import dao.InstructorDao;
import dao.QuizDao;
import dao.RecordDao;
import model.File;
import model.Instructor;
import model.Quiz;
import model.Record;
import org.junit.Before;
import org.junit.Test;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class RecordDaoTest {
    private FileDao fileDao;
    private InstructorDao instructorDao;
    private QuizDao quizDao;
    private RecordDao recordDao;
    String fileId_1;
    String fileId_2;
    int instructorId_1;
    int instructorId_2;
    Quiz quiz1;
    Quiz quiz2;
    Quiz quiz3;
    Quiz quiz4;

    @Before
    public void setup() throws URISyntaxException, IOException {
        DaoFactory.instantiateSql2o();
        fileDao = DaoFactory.getFileDao();
        instructorDao = DaoFactory.getInstructorDao();
        quizDao = DaoFactory.getQuizDao();
        recordDao = DaoFactory.getRecordDao();
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
        quiz1 = new Quiz(fileId_1, 1, "A", 0, 0, 0, 0);
        quiz2 = new Quiz(fileId_2, 1, "A", 0, 0, 0, 0);
        quiz3 = new Quiz(fileId_2, 2, "A", 0, 0, 0, 0);
        quiz4 = new Quiz(fileId_2, 3, "A", 0, 0, 0, 0);
        quizDao.add(quiz1);
        quizDao.add(quiz2);
        quizDao.add(quiz3);
        quizDao.add(quiz4);
    }

    @Test
    public void addSingleRecord() {
        List<Quiz> originList = new ArrayList<>();
        List<Quiz> updateList = new ArrayList<>();
        originList.add(quiz1);
        assertEquals(originList, quizDao.getQuizStatByFileId(fileId_1));
        Record record_1 = new Record(fileId_1, 1, 'A');
        recordDao.add(record_1);
        Quiz quiz1Update = new Quiz(fileId_1, 1, "A", 1, 0, 0, 0);
        assertEquals(quiz1Update.getCountA(), quizDao.getQuizStatByFileId(fileId_1).get(0).getCountA());
    }

    @Test
    public void addMultipleRecord() {

        //set quiz 2 question 1 stat
        Record record_1 = new Record(fileId_2, 1, 'A');
        Record record_2 = new Record(fileId_2, 1, 'B');
        Record record_3 = new Record(fileId_2, 1, 'B');
        Record record_4 = new Record(fileId_2, 1, 'D');
        recordDao.add(record_1);
        recordDao.add(record_2);
        recordDao.add(record_3);
        recordDao.add(record_4);
        //set quiz2 question 2 to 3
        Record record_5 = new Record(fileId_2, 2, 'C');
        Record record_6 = new Record(fileId_2, 3, 'D');
        recordDao.add(record_5);
        recordDao.add(record_6);

        Quiz quiz2_1Update = new Quiz(fileId_2, 1, "A", 1, 2, 0, 1);
        Quiz quiz2_2Update = new Quiz(fileId_2, 2, "A", 0, 0, 1, 0);
        Quiz quiz2_3Update = new Quiz(fileId_2, 3, "A", 0, 0, 0, 1);

        assertEquals(quiz2_1Update.getCountA(), quizDao.getSingleQuizStat(fileId_2, 1).getCountA());
        assertEquals(quiz2_1Update.getCountB(), quizDao.getSingleQuizStat(fileId_2, 1).getCountB());
        assertEquals(quiz2_1Update.getCountC(), quizDao.getSingleQuizStat(fileId_2, 1).getCountC());
        assertEquals(quiz2_1Update.getCountD(), quizDao.getSingleQuizStat(fileId_2, 1).getCountD());
        assertEquals(quiz2_2Update.getCountC(), quizDao.getSingleQuizStat(fileId_2, 2).getCountC());
        assertEquals(quiz2_3Update.getCountD(), quizDao.getSingleQuizStat(fileId_2, 3).getCountD());

    }

}