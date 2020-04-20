package dao;

import exception.DaoException;
import exception.LoginException;
import exception.RegisterException;
import model.File;
import model.Instructor;
import model.Quiz;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.io.InputStream;
import java.util.*;

public class Sql2oInstructorDao implements InstructorDao{
    private Sql2o sql2o;

    public Sql2oInstructorDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public Instructor checkUserIdentity(String email, String pswd) {
        Instructor instructor;
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT instructorId, name, email FROM instructor Where email = :email AND pswd = :pswd;";
            instructor =  conn.createQuery(sql)
                    .addParameter("email", email)
                    .addParameter("pswd", pswd)
                    .executeAndFetchFirst(Instructor.class);
//            System.out.println(instructor.getPswd());
        } catch (Sql2oException ex) {
            throw new DaoException("Database error", ex);
        }

        if (instructor == null) {
            throw new LoginException("User authentication failure. Please input again.");
        }

        return instructor; // return userId if find this instructor
    }

    @Override
    public void registerUser(Instructor instructor) {
        Integer id;
        // user not exist then register, otherwise throw UserException
        // email must be unique
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT instructorId FROM instructor Where email = :email;";
            id =  conn.createQuery(sql)
                    .addParameter("email", instructor.getEmail())
                    .executeScalar(Integer.class);
        } catch (Sql2oException ex) {
            throw new DaoException("Database error", ex);
        }

        if (id != null) {
            throw new RegisterException("User already exists with the same email. " +
                    "Please modify your register info.");
        }

        System.out.println("user not exists, register permit.");
        try (Connection conn = sql2o.open()) {
            String sql = "INSERT INTO instructor(name, email, pswd) VALUES (:name, :email, :pswd);";
            id = (int) conn.createQuery(sql, true)
                    .addParameter("name", instructor.getName())
                    .addParameter("email", instructor.getEmail())
                    .addParameter("pswd", instructor.getPswd())
                    .executeUpdate()
                    .getKey(); // Returns the key this connection is associated with.

            instructor.setInstructorId(id);
            System.out.println("Register user successfully.");
        } catch (Sql2oException ex1) {
            throw new DaoException("Unable to register the user.", ex1);
        }
    }

    @Override
    public void storeUserFileInfo(int userId, int fileId) {
        try (Connection conn = sql2o.open()) {
            String sql = "INSERT INTO ins_file(instructorId, fileId) VALUES (:userId, :fileId);";
            conn.createQuery(sql, true)
                    .addParameter("userId", userId)
                    .addParameter("fileId", fileId)
                    .executeUpdate();

            System.out.println("user-file information stored.");
        } catch (Sql2oException ex1) {
            throw new DaoException("Unable to store user-file information.", ex1);
        }
    }

    @Override
    public List<Map<String, Object>> getUserFileList(int instructorId) {
        List<Map<String, Object>> listFromTable;
        Map<String, Object> newMap = new HashMap<>();
        List<Map<String, Object>> resultFile = new ArrayList<>();
        String sql = "SELECT file.fileId, fileName FROM file " +
                "JOIN ins_file ON file.fileId = ins_file.fileId " +
                "WHERE instructorId = :instructorId";
        try (Connection conn = sql2o.open()) {
            listFromTable = conn.createQuery(sql)
                            .addParameter("instructorId", instructorId)
                            .executeAndFetchTable().asList();
            for(Map<String, Object> map : listFromTable) {
                newMap.put("fileName", map.get("filename"));
                newMap.put("fileId", map.get("fileid"));
                resultFile.add(newMap);
            }

            return resultFile;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to find file history", ex);
        }
    }
}
