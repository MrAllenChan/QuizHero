package dao;

import exception.DaoException;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DaoFactory {
    public static boolean DROP_TABLES_IF_EXIST = true;
    public static String PATH_TO_DATABASE_FILE = "./Store.db";
    private static Sql2o sql2o;

    private DaoFactory() {
        // This class is not meant to be instantiated!
    }

    private static String getURI() throws URISyntaxException, SQLException {
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl == null) {
            // Not on Heroku, so use SQLite
            return "jdbc:sqlite:" + PATH_TO_DATABASE_FILE;
        }

        URI dbUri = new URI(databaseUrl);

        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':'
                + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

        return dbUrl;
    }


    private static void instantiateSql2o() throws URISyntaxException, SQLException {
        if (sql2o == null) {
            final String URI = getURI();
            final String USERNAME = "";
            final String PASSWORD = "";
            sql2o = new Sql2o(URI, USERNAME, PASSWORD);
            System.out.println("database instantiated successfully.");
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

    public static QuizDao getQuizDao() throws URISyntaxException, SQLException {
        instantiateSql2o();
        createQuizTable(sql2o);
        return new Sql2oQuizDao(sql2o);
    }

    public static RecordDao getRecordDao() throws URISyntaxException, SQLException {
        instantiateSql2o();
        createQuizTable(sql2o);
        return new Sql2oRecordDao(sql2o);
    }

}
