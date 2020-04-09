package dao;

import exception.DaoException;
import model.User;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

public class DaoFactory {
    public static boolean DROP_TABLES_IF_EXIST = true;
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
            System.out.println("database instantiated successfully.");
        }
    }

    private static void createUserTable(Sql2o sql2o) {
        if (DROP_TABLES_IF_EXIST) {
            dropUserTableIfExists(sql2o);
        }
        String sql = "CREATE TABLE IF NOT EXISTS user(" +
                "userId INTEGER PRIMARY KEY," +
                "name VARCHAR(30)," +
                "email VARCHAR(30)," +
                "pswd VARCHAR(30)" +
                ");";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create user table", ex);
        }
    }

    private static void createUserFileTable(Sql2o sql2o) {
        if (DROP_TABLES_IF_EXIST) {
            dropQuizTableIfExists(sql2o);
        }
        String sql = "CREATE TABLE IF NOT EXISTS user_file(" +
                "userId INTEGER PRIMARY KEY," +
                "fileId VARCHAR(30)," +
                "url VARCHAR(30)" +
                ");";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create user table", ex);
        }
    }

    private static void createQuizTable(Sql2o sql2o) {
        if (DROP_TABLES_IF_EXIST) {
            dropQuizTableIfExists(sql2o);
        }
        String sql = "CREATE TABLE IF NOT EXISTS Quiz(" +
                "id INTEGER PRIMARY KEY," +
                "fileId INTEGER," +
                "questionId INTEGER," +
                "answer VARCHAR(30)," +
                "countA INTEGER," +
                "countB INTEGER," +
                "countC INTEGER," +
                "countD INTEGER" +
                ");";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create Quiz table", ex);
        }
    }

    private static void dropQuizTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS Quiz;";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            System.out.println("drop Quiz table successfully.");
        } catch (Sql2oException ex) {
            throw new DaoException("Fail dropping Quiz table.", ex);
        }
    }

    private static void dropUserTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS user;";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            System.out.println("drop user table successfully.");
        } catch (Sql2oException ex) {
            throw new DaoException("Fail dropping user table.", ex);
        }
    }

    public static QuizDao getQuizDao() {
        instantiateSql2o();
        createQuizTable(sql2o);
        return new Sql2oQuizDao(sql2o);
    }

    public static RecordDao getRecordDao() {
        instantiateSql2o();
//        createQuizTable(sql2o);
        return new Sql2oRecordDao(sql2o);
    }

    public static UserDao getUserDao() {
        instantiateSql2o();
        createUserTable(sql2o);
        return new Sql2oUserDao(sql2o);
    }
}
