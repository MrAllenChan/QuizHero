package dao;

import exception.DaoException;
import model.Quiz;
import org.junit.Before;
import org.junit.Test;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class QuizDaoTest {
    private RecordDao recordDao;
    private QuizDao quizDao;

    @Before
    public void setup() throws URISyntaxException {
        quizDao = DaoFactory.getQuizDao();
        recordDao = DaoFactory.getRecordDao();
    }

    @Test
    public void addQuiz() {
        Quiz quiz = new Quiz (100, 100, "A", 0, 0, 0, 0);
        assertEquals(0, quiz.getId());
        quizDao.add(quiz);
        assertNotEquals(0, quiz.getId());
    }


    @Test (expected = DaoException.class)
    public void addExistingQuizDao() {
        Quiz quiz = new Quiz (100, 100, "A", 0, 0, 0, 0);
        Quiz quiz_duplicate = new Quiz (100, 100, "B", 10, 3, 7, 8);
        quizDao.add(quiz);
        quizDao.add(quiz_duplicate);
    }

    @Test
    public void getAllQuizStat() {
        Quiz quiz_1 = new Quiz (100, 100, "A", 0, 0, 0, 0);
        Quiz quiz_2 = new Quiz (100, 101, "B", 9, 8, 7, 6);
        Quiz quiz_3 = new Quiz (101, 100, "C", 12, 44, 99, 7777);
        List<Quiz> quizList = new ArrayList<>();
        quizList.add(quiz_1);
        quizList.add(quiz_2);
        quizList.add(quiz_3);
        quizDao.add(quiz_1);
        quizDao.add(quiz_2);
        quizDao.add(quiz_3);
        assertEquals(quizList, quizDao.getAllQuizStat());
    }

    @Test
    public void getSingleQuizStat() {
        Quiz quiz_1 = new Quiz (100, 100, "A", 0, 0, 0, 0);
        Quiz quiz_2 = new Quiz (100, 101, "B", 9, 8, 7, 6);
        Quiz quiz_3 = new Quiz (101, 100, "C", 12, 44, 99, 7777);
        quizDao.add(quiz_1);
        quizDao.add(quiz_2);
        quizDao.add(quiz_3);
        assertEquals(quiz_2, quizDao.getSingleQuizStat(100, 101));
    }

    @Test
    public void getQuizStatByFileId() {
        Quiz quiz_1 = new Quiz (100, 100, "A", 0, 0, 0, 0);
        Quiz quiz_2 = new Quiz (100, 101, "B", 9, 8, 7, 6);
        Quiz quiz_3 = new Quiz (101, 100, "C", 12, 44, 99, 7777);
        quizDao.add(quiz_1);
        quizDao.add(quiz_2);
        quizDao.add(quiz_3);
        List<Quiz> quizList = new LinkedList<>();
        quizList.add(quiz_1);
        quizList.add(quiz_2);
        assertEquals(quizList, quizDao.getQuizStatByFileId(100));
    }
}
