package dao;

import exception.DaoException;
import model.Course;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.List;

public class Sql2oCourseDao implements CourseDao {

  private Sql2o sql2o;

  public Sql2oCourseDao(Sql2o sql2o) {
    this.sql2o = sql2o;
  }

  @Override
  public void add(Course course) throws DaoException {
    try (Connection conn = sql2o.open()) {
      String sql = "INSERT INTO Courses(name, url) VALUES(:name, :url);";
      int id = (int) conn.createQuery(sql)
          .bind(course)
          .executeUpdate()
          .getKey();
      course.setId(id);
    } catch (Sql2oException ex) {
      throw new DaoException("Unable to add the course", ex);
    }
  }

  @Override
  public List<Course> findAll() {
    try (Connection conn = sql2o.open()) {
      String sql = "SELECT * FROM Courses;";
      return conn.createQuery(sql).executeAndFetch(Course.class);
    }
  }
}
