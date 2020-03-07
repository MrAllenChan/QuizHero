package dao;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

public final class DaoFactory {

  public static boolean DROP_TABLES_IF_EXIST = false;
  public static String PATH_TO_DATABASE_FILE = "./Store.db";
  private static Sql2o sql2o;

  private DaoFactory() {
    // This class is not meant to be instantiated!
  }

  private static void instantiateSql2o() {
    if (sql2o == null) {
      final String URI = "jdbc:sqlite:" + PATH_TO_DATABASE_FILE;
      final String USERNAME = "";
      final String PASSWORD = "";
      sql2o = new Sql2o(URI, USERNAME, PASSWORD);
    }
  }

  private static void createCoursesTable(Sql2o sql2o) {
    if (DROP_TABLES_IF_EXIST) dropCoursesTableIfExists(sql2o);
    String sql = "CREATE TABLE IF NOT EXISTS Courses(" +
        "id INTEGER PRIMARY KEY," +
        "name VARCHAR(30) NOT NULL," +
        "url VARCHAR(100)" +
        ");";
    try (Connection conn = sql2o.open()) {
      conn.createQuery(sql).executeUpdate();
    }
  }

  private static void dropCoursesTableIfExists(Sql2o sql2o) {
    String sql = "DROP TABLE IF EXISTS Courses;";
    try (Connection conn = sql2o.open()) {
      conn.createQuery(sql).executeUpdate();
    }
  }

  public static CourseDao getCourseDao() {
    instantiateSql2o();
    createCoursesTable(sql2o);
    return new Sql2oCourseDao(sql2o);
  }

  public static ReviewDao getReviewDao() {
    instantiateSql2o();
    createCoursesTable(sql2o);
    createReviewsTable(sql2o);
    return new Sql2oReviewDao(sql2o);
  }

  private static void createReviewsTable(Sql2o sql2o) {
    if (DROP_TABLES_IF_EXIST) dropReviewsTableIfExists(sql2o);
    String sql = "CREATE TABLE IF NOT EXISTS Reviews(" +
        "id INTEGER PRIMARY KEY," +
        "courseId INTEGER," +
        "rating INTEGER," +
        "comment TEXT," +
        "FOREIGN KEY(courseId) REFERENCES Courses(id)" +
        ");";
    try (Connection conn = sql2o.open()) {
      conn.createQuery(sql).executeUpdate();
    }
  }

  private static void dropReviewsTableIfExists(Sql2o sql2o) {
    String sql = "DROP TABLE IF EXISTS Reviews;";
    try (Connection conn = sql2o.open()) {
      conn.createQuery(sql).executeUpdate();
    }
  }
}
