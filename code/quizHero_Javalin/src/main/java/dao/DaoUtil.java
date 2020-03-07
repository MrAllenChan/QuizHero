package dao;

import model.Course;
import model.Review;

import java.util.List;
import java.util.Random;

public final class DaoUtil {

  private DaoUtil() {
    // This class is not mean to be instantiated!
  }

  public static void addSampleCourses(CourseDao courseDao) {
    courseDao.add(new Course("OOSE", "jhu-oose.com"));
    courseDao.add(new Course("Gateway", "jhu-gateway.com"));
  }

  public static void addSampleReviews(CourseDao courseDao, ReviewDao reviewDao) {
    if (courseDao.findAll().size() == 0) addSampleCourses(courseDao);

    String[] reviews = new String[]{"Awful", "Bad", "OK", "Good", "Excellent"};
    Random random = new Random();
    final int NUM_REVIEWS_PER_COURSE = 3;

    List<Course> courseList = courseDao.findAll();
    for (Course c : courseList) {
      for (int i = 0; i < NUM_REVIEWS_PER_COURSE; i++) {
        int index = random.nextInt(reviews.length);
        reviewDao.add(new Review(c.getId(), index + 1, reviews[index]));
      }
    }
  }
}
