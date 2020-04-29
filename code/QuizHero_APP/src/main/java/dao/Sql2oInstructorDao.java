package dao;

import exception.DaoException;
import exception.LoginException;
import exception.RegisterException;
import model.File;
import model.Instructor;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.*;

public class Sql2oInstructorDao implements InstructorDao{
    private Sql2o sql2o;

    public Sql2oInstructorDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public Instructor userLogin(String email, String pswd) {
        Instructor instructor;
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT instructorId, name, email FROM instructor Where email = :email AND pswd = :pswd;";
            instructor =  conn.createQuery(sql)
                    .addParameter("email", email)
                    .addParameter("pswd", pswd)
                    .executeAndFetchFirst(Instructor.class);
        } catch (Sql2oException ex) {
            throw new DaoException("Database error", ex);
        }

        if (instructor == null) {
            throw new LoginException("User authentication failure. Please input again.");
        }

        return instructor; // return if find the instructor
    }

    @Override
    public void registerUser(Instructor instructor) {
        checkUserExist(instructor.getEmail());
        System.out.println("user not exists, register permit.");
        try (Connection conn = sql2o.open()) {
            String sql = "INSERT INTO instructor(name, email, pswd) VALUES (:name, :email, :pswd);";
            int id = (int) conn.createQuery(sql, true)
                    .addParameter("name", instructor.getName())
                    .addParameter("email", instructor.getEmail())
                    .addParameter("pswd", instructor.getPswd())
                    .executeUpdate()
                    .getKey(); // Returns the key this connection is associated with.

            instructor.setInstructorId(id);
            System.out.println("Register user successfully.");
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to register the user.", ex);
        }
    }

    @Override
    public void checkUserExist(String email) {
        // email must be unique
        Integer id;
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT instructorId FROM instructor Where email = :email;";
            id =  conn.createQuery(sql)
                    .addParameter("email", email)
                    .executeScalar(Integer.class);
            if (id != null) {
                throw new RegisterException("User already exists with the same email.");
            }
        } catch (Sql2oException ex) {
            throw new DaoException("Database error", ex);
        }
    }

    @Override
    public List<File> getUserFileList(int instructorId) {
        String sql = "SELECT file.fileId, fileName, instructorid FROM file " +
                "JOIN ins_file ON file.fileId = ins_file.fileId " +
                "WHERE instructorId = :instructorId";
        try (Connection conn = sql2o.open()) {
            return conn.createQuery(sql)
                            .addParameter("instructorId", instructorId)
                            .executeAndFetch(File.class);
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to find file history", ex);
        }
    }
}
