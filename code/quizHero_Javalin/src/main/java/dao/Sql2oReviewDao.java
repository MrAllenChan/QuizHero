package dao;

import exception.DaoException;
import model.Review;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.List;

public class Sql2oReviewDao implements ReviewDao {

  private Sql2o sql2o;

  public Sql2oReviewDao(Sql2o sql2o) {
    this.sql2o = sql2o;
  }

  @Override
  public void add(Review review) throws DaoException {
    String sql;
    try (Connection conn = sql2o.open()) {
      /* In SQLite Foreign key constraints are disabled by default (for backwards compatibility),
         so must be enabled for each database connection separately. Annoying!!  */
      sql = "PRAGMA foreign_keys = ON;";
      conn.createQuery(sql).executeUpdate();

      sql = "INSERT INTO Reviews(courseId, rating, comment) " +
          "VALUES (:courseId, :rating, :comment);";
      int id = (int) conn.createQuery(sql)
          .bind(review)
          .executeUpdate()
          .getKey();
      review.setId(id);
    } catch (Sql2oException ex) {
      throw new DaoException("Unable to add the review", ex);
    }
  }

  @Override
  public List<Review> findAll() {
    String sql = "SELECT * FROM Reviews;";
    try (Connection conn = sql2o.open()) {
      return conn.createQuery(sql)
          .executeAndFetch(Review.class);
    }
  }

  @Override
  public List<Review> findByCourseId(int courseId) {
    // TODO: Implement me!
    String sql = "SELECT * from Reviews WHERE id = "+ courseId + ";";
    try (Connection conn = sql2o.open()){
      return conn.createQuery(sql)
              .executeAndFetch(Review.class);
    }
  }
}
