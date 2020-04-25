package dao;

import exception.DaoException;
import model.File;
import model.Instructor;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface InstructorDao {
    Instructor userLogin(String email, String pswd);
    void registerUser(Instructor instructor);
    void checkUserExist(String email);
    void storeUserFileInfo(int userId, String fileId);
    List<File> getUserFileList(int userId);
}
