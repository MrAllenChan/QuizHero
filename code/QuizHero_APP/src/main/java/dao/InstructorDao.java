package dao;

import exception.DaoException;
import model.Instructor;

import java.util.UUID;

public interface InstructorDao {
    int checkUserIdentity(Instructor instructor);
    void registerUser(Instructor instructor);
    void storeUserFileInfo(int userId, UUID uuid, String url);
}
