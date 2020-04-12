package dao;

import exception.DaoException;
import exception.LoginException;
import exception.RegisterException;
import model.Instructor;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.UUID;

public class Sql2oInstructorDao implements InstructorDao{
    private Sql2o sql2o;

    public Sql2oInstructorDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public int checkUserIdentity(Instructor instructor) {
        Integer userId;
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT instructorId FROM Instructor Where name = :name And email = :email" +
                    " And pswd = :pswd;";
            userId =  conn.createQuery(sql)
                    .addParameter("name", instructor.getName())
                    .addParameter("email", instructor.getEmail())
                    .addParameter("pswd", instructor.getPswd())
                    .executeScalar(Integer.class);
        } catch (Sql2oException ex) {
            throw new DaoException("Database error", ex);
        }

        if (userId == null) {
            throw new LoginException("User authentication failure. Please input again.");
        }

        return userId; // return userId if find this instructor
    }

    @Override
    public void registerUser(Instructor instructor) {
        int userId = 0;
        // user not exist then register, otherwise throw UserException
        try {
            userId = checkUserIdentity(instructor);
            System.out.println(userId);
            if (userId != 0) {
                throw new RegisterException("User already exists. Please modify your register info.");
            }
        } catch (LoginException ex) {
            System.out.println("user not exists, register permit.");
            try (Connection conn = sql2o.open()) {
                String sql = "INSERT INTO Instructor(name, email, pswd) VALUES (:name, :email, :pswd);";
                userId = (int) conn.createQuery(sql, true)
                        .addParameter("name", instructor.getName())
                        .addParameter("email", instructor.getEmail())
                        .addParameter("pswd", instructor.getPswd())
                        .executeUpdate()
                        .getKey();

                instructor.setInstructorId(userId);
                System.out.println("Register user successfully.");
            } catch (Sql2oException ex1) {
                throw new DaoException("Unable to register the user.", ex1);
            }
        }
    }

    @Override
    public void storeUserFileInfo(int userId, UUID uuid, String url) {

    }
}
