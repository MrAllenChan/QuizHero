package model;

import java.io.InputStream;

public class File {
    public int fileId;
    public String fileName;
    public Boolean filePermission; // permission control of access to entire file
    public Boolean quizPermission; // permission control of access to all quizzes in a file
    public InputStream fileContent;


    public File(int fileId, String fileName, InputStream fileContent) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.fileContent = fileContent;
        this.filePermission = false; //default false;
        this.quizPermission = false; //default false;
    }

    public File(int fileId, String fileName, Boolean fileAccess, Boolean quizAccess, InputStream fileContent) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.filePermission = fileAccess;
        this.quizPermission = quizAccess;
        this.fileContent = fileContent;
    }

    public Boolean getFilePermission() {
        return filePermission;
    }

    public Boolean getQuizPermission() {
        return quizPermission;
    }

    public int getFileId() {
        return fileId;
    }

    public String getFileName() {
        return fileName;
    }

    public InputStream getFileContent() {
        return fileContent;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

}
