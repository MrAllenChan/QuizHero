package dao;

import exception.DaoException;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;
import java.net.URI;
import java.net.URISyntaxException;


public class DaoFactory {
    public static boolean DROP_TABLES_IF_EXIST = true;
    public static String PATH_TO_DATABASE_FILE = "./Store.db";
    private static Sql2o sql2o;

    private DaoFactory() {
        // This class is not meant to be instantiated!
    }

    public static void clearDatabase() throws URISyntaxException{
        instantiateSql2o();
        if (DROP_TABLES_IF_EXIST) {
            dropInsFileTableIfExists(sql2o);
            dropQuizTableIfExists(sql2o);
            dropInstructorTableIfExists(sql2o);
            dropFileTableIfExists(sql2o);
        }
    }

    private static void instantiateSql2o() throws URISyntaxException {
        if (sql2o == null) {
            final String URI;
            final String USERNAME;
            final String PASSWORD;
            String databaseUrl = System.getenv("DATABASE_URL");
            if (databaseUrl == null) {
                // Not on heroku, use SQLite
                URI = "jdbc:postgresql://localhost:5432/postgres";
                USERNAME = "postgres";
                PASSWORD = "1009";
            } else {
                // use postgreSQL
                URI dbUri = new URI(databaseUrl);
                URI = "jdbc:postgresql://" + dbUri.getHost() + ':'
                        + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";
                USERNAME = dbUri.getUserInfo().split(":")[0];
                PASSWORD = dbUri.getUserInfo().split(":")[1];
            }

            sql2o = new Sql2o(URI, USERNAME, PASSWORD);
            System.out.println("database instantiated successfully.");
        }
    }

    private static void createInstructorTable(Sql2o sql2o) {
        String sql = "CREATE TABLE IF NOT EXISTS instructor(" +
                "instructorId SERIAL," +
                "name VARCHAR(30)," +
                "email VARCHAR(30) NOT NULL," +
                "pswd VARCHAR(30) NOT NULL," +
                "PRIMARY KEY (instructorId)," +
                "UNIQUE (email)" +
                ");";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create Instructor table", ex);
        }
    }

    private static void createQuizTable(Sql2o sql2o) {
        String sql = "CREATE TABLE IF NOT EXISTS quiz(" +
                "id SERIAL PRIMARY KEY," +
                "fileId INTEGER NOT NULL," +
                "questionId INTEGER NOT NULL," +
                "answer VARCHAR(30)," +
                "countA INTEGER," +
                "countB INTEGER," +
                "countC INTEGER," +
                "countD INTEGER," +
                "FOREIGN KEY (fileId) REFERENCES file(fileId)" +
                ");";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create quiz table", ex);
        }
    }

    private static void createFileTable(Sql2o sql2o) {
        String sql = "create table if not exists file(" +
                "fileId Integer PRIMARY KEY, " +
                "fileName VARCHAR(30) NOT NULL, " +
                "filePermission BOOLEAN DEFAULT false," +
                "quizPermission BOOLEAN DEFAULT false," +
                "mdFile bytea" +
                ")";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create file table", ex);
        }
    }

    private static void createInsFileTable(Sql2o sql2o) {
        String sql = "CREATE TABLE IF NOT EXISTS ins_file(" +
                "instructorId Integer," +
                "fileId Integer," +
                "PRIMARY KEY (instructorId, fileId)," +
                "FOREIGN KEY (instructorId) REFERENCES instructor(instructorId)," +
                "FOREIGN KEY (fileId) REFERENCES file(fileId)" +
                ");";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create ins_file table", ex);
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

    private static void dropInstructorTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS instructor;";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            System.out.println("drop instructor table successfully.");
        } catch (Sql2oException ex) {
            throw new DaoException("Fail dropping instructor table.", ex);
        }
    }

    private static void dropInsFileTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS ins_file;";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            System.out.println("drop ins_file table successfully.");
        } catch (Sql2oException ex) {
            throw new DaoException("Fail dropping ins_file table.", ex);
        }
    }

    private static void dropFileTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS file;";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            System.out.println("drop file table successfully.");
        } catch (Sql2oException ex) {
            throw new DaoException("Fail dropping file table.", ex);
        }
    }

    public static FileDao getFileDao() {
//        instantiateSql2o();
        createFileTable(sql2o);
        return new Sql2oFileDao(sql2o);
    }

    public static InstructorDao getInstructorDao() {
//        instantiateSql2o();
        createInstructorTable(sql2o);
        createInsFileTable(sql2o);
        return new Sql2oInstructorDao(sql2o);
    }

    public static QuizDao getQuizDao() throws {
//        instantiateSql2o();
        createQuizTable(sql2o);
        return new Sql2oQuizDao(sql2o);
    }

    public static RecordDao getRecordDao() throws {
//        instantiateSql2o();
//        createQuizTable(sql2o);
        return new Sql2oRecordDao(sql2o);
    }

}
