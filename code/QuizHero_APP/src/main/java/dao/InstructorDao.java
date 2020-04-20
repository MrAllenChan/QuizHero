package dao;

import exception.DaoException;
import model.File;
import model.Instructor;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface InstructorDao {
    Instructor checkUserIdentity(String email, String pswd);
    void registerUser(Instructor instructor);
    void storeUserFileInfo(int userId, int fileId);
    List<Map<String, Object>> getUserFileList(int userId);
}
