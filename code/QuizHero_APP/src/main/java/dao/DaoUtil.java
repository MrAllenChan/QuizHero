package dao;
import model.Instructor;
import model.Quiz;
import java.io.FileInputStream;

/**
 * DaoUtil class contains methods that add some initial sample data to the database
 * @author Ziming Chen, Nanxi Ye, Chenghao Sun
 * @version 1.0
 */
public final class DaoUtil {

    /* This class is not mean to be instantiated! */
    private DaoUtil() {}

    public static void addSampleFiles(Sql2oFileDao fileDao) { }

//    public static void addSampleQuizzes(QuizDao quizDao) {
////        quizDao.add(new Quiz(1, 1, "A", 10, 12, 6, 7));
////        quizDao.add(new Quiz(1, 2, "B", 8, 3, 21, 9));
//    }

    /**
     * Add some sample instructors to the instructor table
     * @param instructorDao dao for instructor table
     */
    public static void addSampleUsers(InstructorDao instructorDao) {
        instructorDao.registerUser(new Instructor("Allen", "zchen85@jhu.edu", "9999"));
        instructorDao.registerUser(new Instructor("Bob Wang", "bob@jhu.edu", "8888"));
        instructorDao.registerUser(new Instructor("Richard", "richard@jhu.edu", "7777"));
    }

//    public static void addSampleUserFiles(InstructorDao instructorDao) {
//        instructorDao.storeUserFileInfo(1, 1);
//        instructorDao.storeUserFileInfo(1, 2);
//        instructorDao.storeUserFileInfo(2, 1);
//    }
}
