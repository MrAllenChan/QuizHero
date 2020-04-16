package dao;
import exception.DaoException;
import model.Quiz;
import model.Record;
import org.junit.Before;
import org.junit.Test;
import org.sql2o.Sql2o;

import java.net.URISyntaxException;

import static org.junit.Assert.assertEquals;

public class RecordDaoTest {

    private RecordDao recordDao;
    private QuizDao quizDao;

    @Before
    public void setup() throws URISyntaxException {
        quizDao = DaoFactory.getQuizDao();
        recordDao = DaoFactory.getRecordDao();
    }

    @Test
    public void addRecord() {
        Record record = new Record (1, 1, 'A');
        quizDao.add(new Quiz(1, 1, "A", 0, 0, 0, 0));
        Quiz quiz = quizDao.getSingleQuizStat(1, 1);
        recordDao.add(record);
        Quiz quiz_update = quizDao.getSingleQuizStat(1, 1);
        assertEquals(quiz.getCountA() + 1, quiz_update.getCountA());
    }

    @Test (expected = DaoException.class)
    public void addNonExistingRecord() {
        Record record = new Record (88, 99, 'A');
        quizDao.add(new Quiz(1, 1, "A", 0, 0, 0, 0));
        Quiz quiz = quizDao.getSingleQuizStat(1, 1);
        recordDao.add(record);
    }

}
