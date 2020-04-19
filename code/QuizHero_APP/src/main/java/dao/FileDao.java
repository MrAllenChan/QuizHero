package dao;

import java.io.InputStream;

public interface FileDao {
    public InputStream getFile(int id);
    public void storeFile(int fileId, String fileName, InputStream inputStream);
    public void changeQuizPermission(int fileId, boolean permission);
    public Boolean checkQuizPermission(int fileId);
}
