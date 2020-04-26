package dao;

import model.File;

import java.io.InputStream;

public interface FileDao {
    InputStream getFile(String fileId);
    void storeFile(File file);
    void storeInsFile(File file);
    void changeFilePermission(String fileId, boolean permission);
    Boolean checkFilePermission(String fileId);
    void changeQuizPermission(String fileId, boolean permission);
    Boolean checkQuizPermission(String fileId);
    void deleteFile(String fileId);
    void checkFileExist(String fileId);
}
