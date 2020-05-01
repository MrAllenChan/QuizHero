package dao;

import model.File;
import model.Instructor;

import java.util.List;

/**
 * InstructorDao interface defines methods related to the instructor table
 * e.g. user login, user register, get files of a user
 * @author Ziming Chen, Nanxi Ye, Chenghao Sun
 * @version 1.0
 */
public interface InstructorDao {
    /**
     * This method is used to verify registered user information for given input
     * @param email String of user email address
     * @param pswd String of user password
     * @return an instance of Instructor class with matching email and password fields
     */
    Instructor userLogin(String email, String pswd);

    /**
     * This method is used to register a new user information and store user info in database table
     * @param instructor Instructor class containing the registered user information
     */
    void registerUser(Instructor instructor);

    /**
     * This method is used to check if the input email exists as a stored user information in database table
     * @param email String of the email address to be checked
     */
    void checkUserExist(String email);

    /**
     * This method is used to get the uploaded file of given user
     * @param userId unique id of user
     * @return List of File classes that were uploaded by the user of input userId
     */
    List<File> getUserFileList(int userId);
}
