package dao;

import exception.DaoException;
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
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT userId FROM user Where name = :name And email = :email" +
                    " And pswd = :pswd;";
            Integer userId =  conn.createQuery(sql)
                    .addParameter("name", user.getName())
                    .addParameter("email", user.getEmail())
                    .addParameter("pswd", user.getPswd())
                    .executeScalar(Integer.class);
            if (userId == null) {
                throw new Sql2oException();
            }
            return userId.intValue(); // return userId if find this user
        } catch (Sql2oException ex) {
            throw new DaoException("Authentication failure! Cannot find this user.", ex);
        }
    }

    @Override
    public void registerUser(User user) {
        int userId = 0;
        // user not exist then register, otherwise return DaoException
        try {
            userId = checkUserIdentity(user);
        } catch (DaoException ex) {
            System.out.println("user not exists, register permit.");
        }

        System.out.println(userId);
        if (userId != 0) {
            throw new DaoException("user already exists.", new Sql2oException());
        }
        else {
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
            } catch (Sql2oException ex) {
                throw new DaoException("Unable to register the user", ex);
            }
        }
    }

    @Override
    public void uploadFile(int userId, UUID uuid, String url) {

    }
}
