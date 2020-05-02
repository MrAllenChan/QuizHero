package dao;

import exception.DaoException;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * DaoFactory class is used for constructing and creating connections to the database
 * Create tables in the database and create DAOs and return DAOs to other classes who want to use
 * Factory Design Pattern
 * @author Ziming Chen, Nanxi Ye, Chenghao Sun
 * @version 1.0
 */
public final class DaoFactory {
    public static boolean DROP_TABLES_IF_EXIST = true;
    public static String PATH_TO_DATABASE_FILE = "./Store.db";
    private static Sql2o sql2o;

    /* This class is not meant to be instantiated! */
    private DaoFactory() {}

    /**
     * Drop all the tables in the database.
     */
    public static void clearDatabase(){
        dropInsFileTableIfExists(sql2o);
        dropQuizTableIfExists(sql2o);
        dropInstructorTableIfExists(sql2o);
        dropFileTableIfExists(sql2o);
    }

    /**
     * This method is used to instantiate a Sql2o that connects to the PostgreSQL database
     * @exception URISyntaxException exception occurs if a string could not be parsed as a URI reference
     */
    public static void connectDatabase() throws URISyntaxException {
        if (sql2o == null) {
            final String URI;
            final String USERNAME;
            final String PASSWORD;
            String databaseUrl = System.getenv("DATABASE_URL");
            if (databaseUrl == null) {
                // Not on heroku, use local PostgreSQL
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
        if (DROP_TABLES_IF_EXIST) {
            clearDatabase();
        }
    }

    /**
     * create instructor table
     * @param sql2o instance of Sql2o class
     */
    private static void createInstructorTable(Sql2o sql2o) {
        String sql = "CREATE TABLE IF NOT EXISTS instructor(" +
                "instructorId SERIAL," +
                "name VARCHAR(30)," +
                "email VARCHAR(30) NOT NULL," +
                "pswd VARCHAR(30) NOT NULL," +
                "PRIMARY KEY (instructorId)," +
                "UNIQUE (email)" +
                ");";

//        System.out.println(sql);
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create Instructor table", ex);
        }
    }

    /**
     * create quiz table
     * @param sql2o instance of Sql2o class
     */
    private static void createQuizTable(Sql2o sql2o) {
        String sql = "CREATE TABLE IF NOT EXISTS quiz(" +
//                "id SERIAL PRIMARY KEY," +
                "fileId VARCHAR(50) NOT NULL," +
                "questionId INTEGER NOT NULL," +
                "answer VARCHAR(30)," +
                "countA INTEGER," +
                "countB INTEGER," +
                "countC INTEGER," +
                "countD INTEGER," +
                "PRIMARY KEY (fileId, questionId)," +
                "FOREIGN KEY (fileId) REFERENCES file(fileId)" +
                ");";

//        System.out.println(sql);
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create quiz table", ex);
        }
    }

    /**
     * create file table
     * @param sql2o instance of Sql2o class
     */
    private static void createFileTable(Sql2o sql2o) {
        String sql = "create table if not exists file(" +
                "fileId VARCHAR(50) PRIMARY KEY, " +
                "fileName VARCHAR(30) NOT NULL, " +
                "filePermission BOOLEAN DEFAULT false," +
                "quizPermission BOOLEAN DEFAULT false," +
                "fileContent bytea" +
                ")";

//        System.out.println(sql);
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create file table", ex);
        }
    }

    /**
     * create ins_file table
     * @param sql2o instance of Sql2o class
     */
    private static void createInsFileTable(Sql2o sql2o) {
        String sql = "CREATE TABLE IF NOT EXISTS ins_file(" +
                "instructorId Integer," +
                "fileId VARCHAR(50)," +
                "PRIMARY KEY (instructorId, fileId)," +
                "FOREIGN KEY (instructorId) REFERENCES instructor(instructorId)," +
                "FOREIGN KEY (fileId) REFERENCES file(fileId)" +
                ");";

//        System.out.println(sql);
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create ins_file table", ex);
        }
    }

    /**
     * drop quiz table
     * @param sql2o instance of Sql2o class
     */
    private static void dropQuizTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS Quiz;";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            System.out.println("drop Quiz table successfully.");
        } catch (Sql2oException ex) {
            throw new DaoException("Fail dropping Quiz table.", ex);
        }
    }

    /**
     * drop instructor table
     * @param sql2o instance of Sql2o class
     */
    private static void dropInstructorTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS instructor;";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            System.out.println("drop instructor table successfully.");
        } catch (Sql2oException ex) {
            throw new DaoException("Fail dropping instructor table.", ex);
        }
    }

    /**
     * drop ins_file table
     * @param sql2o instance of Sql2o class
     */
    private static void dropInsFileTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS ins_file;";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            System.out.println("drop ins_file table successfully.");
        } catch (Sql2oException ex) {
            throw new DaoException("Fail dropping ins_file table.", ex);
        }
    }

    /**
     * drop file table
     * @param sql2o instance of Sql2o class
     */
    private static void dropFileTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS file;";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            System.out.println("drop file table successfully.");
        } catch (Sql2oException ex) {
            throw new DaoException("Fail dropping file table.", ex);
        }
    }

    /**
     * This method creates the file table and an instance of Sql2oFileDao and returns it
     * @return dao for file table
     */
    public static FileDao getFileDao() {
        createFileTable(sql2o);
        return new Sql2oFileDao(sql2o);
    }

    /**
     * This method creates the instructor table and ins_file table
     * and an instance of Sql2oInstructorDao and returns it
     * @return dao for instructor table and ins_file table
     */
    public static InstructorDao getInstructorDao() {
        createInstructorTable(sql2o);
        createInsFileTable(sql2o);
        return new Sql2oInstructorDao(sql2o);
    }

    /**
     * This method creates the quiz table and an instance of Sql2oQuizDao and returns it
     * @return dao for quiz table
     */
    public static QuizDao getQuizDao() {
        createQuizTable(sql2o);
        return new Sql2oQuizDao(sql2o);
    }
}
