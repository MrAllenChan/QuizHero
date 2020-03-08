package dao;

import org.sql2o.Connection;
import org.sql2o.Sql2o;


public class DaoFactory {
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

    private static void createQuizTable(Sql2o sql2o) {
        if (DROP_TABLES_IF_EXIST) dropQuizTableIfExists(sql2o);
        String sql = "CREATE TABLE IF NOT EXISTS Quiz(" +
                "id INTEGER PRIMARY KEY," +
                "fileId INTEGER," +
                "questionId INTEGER," +
                "A INTEGER," +
                "B INTEGER," +
                "C INTEGER," +
                "D INTEGER," +
                ");";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void dropQuizTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS Quiz;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    public static RecordDao getRecordDao() {
        instantiateSql2o();
        createQuizTable(sql2o);
        return new Sql2oRecordDao(sql2o);
    }





}
