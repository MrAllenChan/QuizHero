package dao;

import exception.DaoException;
import model.File;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

public class Sql2oFileDao {
    private Sql2o sql2o;

    public Sql2oFileDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public InputStream getFile(int id) {
        ByteArrayInputStream byteStream;
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT mdfile FROM file WHERE fileId = " + id;
            byteStream = conn.createQuery(sql, true)
                    .executeAndFetchFirst(ByteArrayInputStream.class);

            return byteStream;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to fetch file.", ex);
        }
    }

    public void storeFile(File file) {
        int fileId = file.getFileId();
        String fileName = file.getFileName();
        Boolean quizAccess = file.getQuizAccess();
        InputStream inputStream = file.getBytea();
        try (Connection conn = sql2o.open()) {
//            String sql = "insert into test values (1, pg_read_file('/Users/apple/jhu-oose/2020-spring-group-QuizHero/code/QuizHero_APP/upload/demo.md')::bytea)";
            String sql = "insert into file values (:fileId, :fileName, :quizAccess, :bytea)";
            conn.createQuery(sql)
                    .addParameter("fileId", fileId)
                    .addParameter("fileName", fileName)
                    .addParameter("quizAccess", quizAccess)
                    .addParameter("bytea", inputStream)
                    .executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to store file content", ex);
        }
    }

    public void changeQuizPermission(int fileId, boolean permission) {
        try (Connection conn = sql2o.open()) {
            String sql = "Update file set quizPermission = " + permission +
                    " WHERE fileId = :fileId";
            System.out.println(sql);
            conn.createQuery(sql).addParameter("fileId", fileId)
                    .executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to change quiz permission status", ex);
        }
    }

    public Boolean checkQuizPermission(int fileId) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT quizPermission from file " +
                    "WHERE fileId = :fileId";
            System.out.println(sql);
            Boolean permission = conn.createQuery(sql).addParameter("fileId", fileId)
                    .executeAndFetchFirst(Boolean.class);
            return permission;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to get quiz permission status", ex);
        }
    }
}
