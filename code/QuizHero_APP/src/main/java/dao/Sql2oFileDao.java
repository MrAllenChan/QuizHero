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

    @Override
    public InputStream getFile(String fileId) {
        checkFileExist(fileId);
        ByteArrayInputStream byteStream;
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT fileContent FROM file WHERE fileId = :fileId";
            byteStream = conn.createQuery(sql)
                    .addParameter("fileId", fileId)
                    .executeAndFetchFirst(ByteArrayInputStream.class);

            return byteStream;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to fetch file.", ex);
        }
    }

    @Override
    public void storeFile(File file) {
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
        storeInsFile(file);
    }

    @Override
    public void storeInsFile(File file) {
        try (Connection conn = sql2o.open()) {
            String sql = "INSERT INTO ins_file(instructorId, fileId) VALUES (:userId, :fileId);";
            conn.createQuery(sql, true)
                    .addParameter("userId", file.getInstructorId())
                    .addParameter("fileId", file.getFileId())
                    .executeUpdate();

            System.out.println("user-file information stored.");
        } catch (Sql2oException ex1) {
            throw new DaoException("Unable to store user-file information.", ex1);
        }
    }

    @Override
    public void changeFilePermission(String fileId, boolean filePermission) {
        checkFileExist(fileId);
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

    @Override
    public Boolean checkFilePermission(String fileId) {
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

    @Override
    public void changeQuizPermission(String fileId, boolean quizPermission) {
        checkFileExist(fileId);
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

    @Override
    public Boolean checkQuizPermission(String fileId) {
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

    @Override
    public void deleteFile(String fileId) {
        checkFileExist(fileId);
        try (Connection conn = sql2o.open()) {
            // Delete row from ins_file table
            String sql = "DELETE FROM ins_file WHERE fileId = :fileId";
            System.out.println(sql);
            conn.createQuery(sql).addParameter("fileId", fileId)
                    .executeUpdate();

            // Delete row from quiz table
            sql = "DELETE FROM quiz WHERE fileId = :fileId";
            System.out.println(sql);
            conn.createQuery(sql).addParameter("fileId", fileId)
                    .executeUpdate();

            // Delete row from file table
            sql = "DELETE FROM file WHERE fileId = :fileId";
            System.out.println(sql);
            conn.createQuery(sql).addParameter("fileId", fileId)
                    .executeUpdate();

        } catch (Sql2oException ex) {
            throw new DaoException("Unable to delete the file", ex);
        }
    }

    @Override
    public void checkFileExist(String fileId) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT quizPermission from file WHERE fileId = :fileId";
            Boolean quizPermission = conn.createQuery(sql).addParameter("fileId", fileId)
                    .executeAndFetchFirst(Boolean.class);
           if (quizPermission == null){
               throw new DaoException("File not exist");
           }
        } catch (Sql2oException ex) {
            throw new DaoException("database connection error", ex);
        }
    }
}
