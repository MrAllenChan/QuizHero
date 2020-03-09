package dao;
import model.Quiz;
import model.Record;

import java.util.HashMap;
import java.util.List;
import java.util.Random;

public final class DaoUtil {

    private DaoUtil() {
        // This class is not mean to be instantiated!
    }

    public static void addSampleQuizzes(QuizDao quizDao) {
//        HashMap<Character, Integer> count = new HashMap<>();
//        count.put('A', 5);
//        count.put('B', 12);
//        count.put('C', 6);
//        count.put('D', 7);
        quizDao.add(new Quiz(1, 1, 5, 12, 6, 7));
    }

//    public static void addSampleReviews(CourseDao courseDao, ReviewDao reviewDao) {
//        if (courseDao.findAll().size() == 0) addSampleCourses(courseDao);
//
//        String[] reviews = new String[]{"Awful", "Bad", "OK", "Good", "Excellent"};
//        Random random = new Random();
//        final int NUM_REVIEWS_PER_COURSE = 3;
//
//        List<Course> courseList = courseDao.findAll();
//        for (Course c : courseList) {
//            for (int i = 0; i < NUM_REVIEWS_PER_COURSE; i++) {
//                int index = random.nextInt(reviews.length);
//                reviewDao.add(new Review(c.getId(), index + 1, reviews[index]));
//            }
//        }
//    }
}
