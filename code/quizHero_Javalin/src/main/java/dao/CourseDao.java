package dao;

import exception.DaoException;
import model.Course;

import java.util.List;

public interface CourseDao {
  void add(Course course) throws DaoException;

  List<Course> findAll();
}
