package dao;

import exception.DaoException;
import model.User;

import java.util.UUID;

public interface UserDao {
    int checkUserIdentity(User user);
    void registerUser(User user);
    void storeUserFileInfo(int userId, UUID uuid, String url);
}
