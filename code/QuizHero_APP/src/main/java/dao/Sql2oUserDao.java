package dao;

import exception.DaoException;
import exception.LoginException;
import exception.RegisterException;
import model.User;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.UUID;

public class Sql2oUserDao implements UserDao{
    private Sql2o sql2o;

    public Sql2oUserDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public int checkUserIdentity(User user) {
        Integer userId;
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT userId FROM user Where name = :name And email = :email" +
                    " And pswd = :pswd;";
            userId =  conn.createQuery(sql)
                    .addParameter("name", user.getName())
                    .addParameter("email", user.getEmail())
                    .addParameter("pswd", user.getPswd())
                    .executeScalar(Integer.class);
        } catch (Sql2oException ex) {
            throw new DaoException("Database error", ex);
        }

        if (userId == null) {
            throw new LoginException("User authentication failure. Please input again.");
        }

        return userId; // return userId if find this user
    }

    @Override
    public void registerUser(User user) {
        int userId = 0;
        // user not exist then register, otherwise throw UserException
        try {
            userId = checkUserIdentity(user);
            System.out.println(userId);
            if (userId != 0) {
                throw new RegisterException("User already exists. Please modify your register info.");
            }
        } catch (LoginException ex) {
            System.out.println("user not exists, register permit.");
            try (Connection conn = sql2o.open()) {
                String sql = "INSERT INTO user(name, email, pswd) VALUES (:name, :email, :pswd);";
                userId = (int) conn.createQuery(sql)
                        .addParameter("name", user.getName())
                        .addParameter("email", user.getEmail())
                        .addParameter("pswd", user.getPswd())
                        .executeUpdate()
                        .getKey();

                user.setUserId(userId);
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
