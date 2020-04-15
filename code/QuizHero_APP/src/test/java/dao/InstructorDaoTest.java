package dao;

import exception.LoginException;
import exception.RegisterException;
import model.Instructor;
import org.junit.Before;
import org.junit.Test;

import java.net.URISyntaxException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class InstructorDaoTest {
    private RecordDao recordDao;
    private QuizDao quizDao;
    private InstructorDao instructorDao;

    @Before
    public void setup() throws URISyntaxException {
        quizDao = DaoFactory.getQuizDao();
        recordDao = DaoFactory.getRecordDao();
        instructorDao = DaoFactory.getInstructorDao();
    }

    @Test
    public void registerUser() {
        Instructor johnSmith = new Instructor("John Smith", "js@gmail.com", "jsjsjs");
        instructorDao.registerUser(johnSmith);
        Instructor result = instructorDao.checkUserIdentity("js@gmail.com", "jsjsjs");
        assertEquals(johnSmith.getInstructorId(), result.getInstructorId());
        assertEquals(johnSmith.getName(), result.getName());
        assertEquals(johnSmith.getEmail(), result.getEmail());
    }

    @Test (expected = RegisterException.class)
    public void registerExistingUser() {
        Instructor johnSmith = new Instructor("John Smith", "js@gmail.com", "jsjsjs");
        instructorDao.registerUser(johnSmith);
        instructorDao.registerUser(johnSmith);
    }

    @Test
    public void storeUserInfo() {
        //TODO
    }

    @Test
    public void checkUserIdentity() {
        Instructor johnSmith = new Instructor("John Smith", "js@gmail.com", "jsjsjs");
        instructorDao.registerUser(johnSmith);
        Instructor result = instructorDao.checkUserIdentity("js@gmail.com", "jsjsjs");
        assertEquals(johnSmith.getInstructorId(), result.getInstructorId());
        assertEquals(johnSmith.getName(), result.getName());
        assertEquals(johnSmith.getEmail(), result.getEmail());
    }

    @Test (expected = LoginException.class)
    public void checkWrongPswdUserIdentity() {
        Instructor johnSmith = new Instructor("John Smith", "js@gmail.com", "jsjsjs");
        instructorDao.registerUser(johnSmith);
        Instructor result = instructorDao.checkUserIdentity("js@gmail.com", "js");
    }

    @Test (expected = LoginException.class)
    public void checkWrongEmailUserIdentity() {
        Instructor johnSmith = new Instructor("John Smith", "js@gmail.com", "jsjsjs");
        instructorDao.registerUser(johnSmith);
        Instructor result = instructorDao.checkUserIdentity("js@jhu.edu", "jsjsjs");
    }

}
