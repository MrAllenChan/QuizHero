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


    /**
     * Add some sample instructors to the instructor table
     * @param instructorDao dao for instructor table
     */
    public static void addSampleUsers(InstructorDao instructorDao) {
        instructorDao.registerUser(new Instructor("Allen", "zchen85@jhu.edu", "9999"));
        instructorDao.registerUser(new Instructor("Bob Wang", "bob@jhu.edu", "8888"));
        instructorDao.registerUser(new Instructor("Richard", "richard@jhu.edu", "7777"));
    }

}
