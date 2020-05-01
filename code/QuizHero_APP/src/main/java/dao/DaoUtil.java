package dao;
import model.File;
import model.Instructor;
import model.Quiz;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

public final class DaoUtil {

    private DaoUtil() {
        // This class is not mean to be instantiated!
    }

    public static void addSampleUsers(InstructorDao instructorDao) {
        Instructor newInstructor = new Instructor("Allen", "zchen85@jhu.edu", "9999");
        instructorDao.registerUser(newInstructor);
        instructorDao.registerUser(new Instructor("Bob Wang", "bob@jhu.edu", "8888"));
        instructorDao.registerUser(new Instructor("Richard", "richard@jhu.edu", "7777"));
    }

}
