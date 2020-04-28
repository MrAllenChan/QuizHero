package dao;

import model.File;
import model.Instructor;

import java.util.List;

public interface InstructorDao {
    Instructor userLogin(String email, String pswd);
    void registerUser(Instructor instructor);
    void checkUserExist(String email);
    List<File> getUserFileList(int userId);
}
