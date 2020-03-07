package model;

import java.util.Objects;


public class FileHelper {
    private int fileId;
    private String filePath;


    public FileHelper(int id,String url) {
        this.filePath = url;
        this.fileId = id;
    }


    public int getFileId() {
        return fileId;
    }
    public String getFilePath() {
        return filePath;
    }

    public void setFileId(int id) {
        this.fileId = id;
    }
    public void setFilePath(String url) {
        this.filePath = url;
    }
}