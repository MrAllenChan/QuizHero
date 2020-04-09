package dao;
import model.Quiz;
import model.Record;
import model.User;

import java.util.HashMap;

public final class DaoUtil {

    private DaoUtil() {
        // This class is not mean to be instantiated!
    }

    public static void addSampleQuizzes(QuizDao quizDao) {
        quizDao.add(new Quiz(1, 1, "A", 10, 12, 6, 7));
        quizDao.add(new Quiz(1, 2, "B", 8, 3, 21, 9));
        quizDao.add(new Quiz(2, 1, "C", 5, 1, 6, 25));
        quizDao.add(new Quiz(9999, 1, "D", 11, 20, 2, 3));
    }

    public static void addSampleUsers(UserDao userDao) {
        userDao.registerUser(new User("allen", "zchen85@jhu.edu", "9999"));
        userDao.registerUser(new User("bob", "bob@jhu.edu", "8888"));
        userDao.registerUser(new User("richard", "richard@jhu.edu", "7777"));
    }
}
