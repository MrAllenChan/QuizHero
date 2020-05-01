package dao;

import model.File;
import java.io.InputStream;

/**
 * FileDao interface defines methods related to the file table
 * e.g. store file, get file, delete file, change quiz and file permission
 * @author Ziming Chen, Nanxi Ye, Chenghao Sun
 * @version 1.0
 */
public interface FileDao {
    /**
     * This method is used to get the file stream from the database
     * @param fileId unique id of a file
     * @return InputStream of the file content
     */
    InputStream getFile(String fileId);

    /**
     * This method is used to store the file stream in the database
     * @param file an instance of File class
     */
    void storeFile(File file);

    /**
     * This method is used to store the relationship between file and instructor in the database
     * @param file an instance of File class
     */
    void storeInsFile(File file);

    /**
     * This method is used to modify the file permission status in the database
     * @param fileId unique id of a file
     * @param permission permission status of a file
     */
    void changeFilePermission(String fileId, boolean permission);

    /**
     * This method is used to get the file permission status in the database
     * @param fileId unique id of a file
     * @return true or false of the file permission status
     */
    Boolean checkFilePermission(String fileId);

    /**
     * This method is used to modify the quiz permission status of a file in the database
     * @param fileId unique id of a file
     * @param permission permission status of the quiz content in a file
     */
    void changeQuizPermission(String fileId, boolean permission);

    /**
     * This method is used to get the quiz permission status of a file in the database
     * @param fileId unique id of a file
     * @return true or false of the quiz permission status
     */
    Boolean checkQuizPermission(String fileId);

    /**
     * This method is used to modify all the information of a file in the database
     * @param fileId unique id of a file
     */
    void deleteFile(String fileId);

    /**
     * This method is used to check whether a file exists in the database
     * @param fileId unique id of a file
     */
    void checkFileExist(String fileId);
}
