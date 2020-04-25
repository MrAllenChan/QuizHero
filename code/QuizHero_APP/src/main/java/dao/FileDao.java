package dao;

import model.File;

import java.io.InputStream;

public interface FileDao {
    public InputStream getFile(String fileId);
    public void storeFile(File file);
    public void changeFilePermission(String fileId, boolean permission);
    public Boolean checkFilePermission(String fileId);
    public void changeQuizPermission(String fileId, boolean permission);
    public Boolean checkQuizPermission(String fileId);
    public void deleteFile(String fileId);
    public void checkFileExist(String fileId);
}
