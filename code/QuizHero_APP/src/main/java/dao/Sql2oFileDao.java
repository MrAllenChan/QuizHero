package dao;

import exception.DaoException;
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

    public void storeFile(int fileId, String fileName, InputStream inputStream) {
        try (Connection conn = sql2o.open()) {
//            String sql = "insert into test values (1, pg_read_file('/Users/apple/jhu-oose/2020-spring-group-QuizHero/code/QuizHero_APP/upload/demo.md')::bytea)";
            String sql = "insert into file values (:fileId, :fileName, :bytea)";
            conn.createQuery(sql)
                    .addParameter("fileId", fileId)
                    .addParameter("fileName", fileName)
                    .addParameter("bytea", inputStream)
                    .executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to store file content", ex);
        }
    }
}
