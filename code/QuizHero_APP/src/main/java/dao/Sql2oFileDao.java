package dao;

import exception.DaoException;
import model.File;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

public class Sql2oFileDao implements FileDao{
    private Sql2o sql2o;

    public Sql2oFileDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public InputStream getFile(int fileId) {
        ByteArrayInputStream byteStream;
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT fileContent FROM file WHERE fileId = " + fileId;
            byteStream = conn.createQuery(sql, true)
                    .executeAndFetchFirst(ByteArrayInputStream.class);

            return byteStream;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to fetch file.", ex);
        }
    }

    public void storeFile(File file) {
//        int fileId = file.getFileId();
//        String fileName = file.getFileName();
//        Boolean fileAccess = file.getFileAccess();
//        Boolean quizAccess = file.getQuizAccess();
//        InputStream inputStream = file.getBytea();
        try (Connection conn = sql2o.open()) {
            String sql = "insert into file values (:fileId, :fileName, :filePermission, :quizPermission, :fileContent)";
            conn.createQuery(sql)
                    .addParameter("fileId", file.getFileId())
                    .addParameter("fileName", file.getFileName())
                    .addParameter("filePermission", file.getFilePermission())
                    .addParameter("quizPermission", file.getQuizPermission())
                    .addParameter("fileContent", file.getFileContent())
                    .executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to store file content", ex);
        }
    }

    public void changeFilePermission(int fileId, boolean filePermission) {
        try (Connection conn = sql2o.open()) {
            String sql = "Update file set filePermission = " + filePermission +
                    " WHERE fileId = :fileId";
            System.out.println(sql);
            conn.createQuery(sql).addParameter("fileId", fileId)
                    .executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to change file permission status", ex);
        }
    }

    public Boolean checkFilePermission(int fileId) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT filePermission from file WHERE fileId = :fileId";
            System.out.println(sql);
            Boolean permission = conn.createQuery(sql).addParameter("fileId", fileId)
                    .executeAndFetchFirst(Boolean.class);
            return permission;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to get file permission status", ex);
        }
    }

    public void changeQuizPermission(int fileId, boolean quizPermission) {
        try (Connection conn = sql2o.open()) {
            String sql = "Update file set quizPermission = " + quizPermission +
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
            String sql = "SELECT quizPermission from file WHERE fileId = :fileId";
            System.out.println(sql);
            Boolean quizPermission = conn.createQuery(sql).addParameter("fileId", fileId)
                    .executeAndFetchFirst(Boolean.class);
            return quizPermission;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to get quiz permission status", ex);
        }
    }
}
