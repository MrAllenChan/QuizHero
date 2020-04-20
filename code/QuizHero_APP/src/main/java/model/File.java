package model;

import java.io.InputStream;
import java.util.Objects;

public class File {
    public int fileId;
    public String fileName;
    public Boolean fileAccess; //permission control of access to entire file
    public Boolean quizAccess; //permission control of access to all quizzes in a file
    public InputStream bytea;


    public File(int fileId, String fileName, InputStream bytea) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.bytea = bytea;
        this.fileAccess = false; //default false;
        this.quizAccess = false; //default false;
    }

    public File(int fileId, String fileName, Boolean fileAccess, Boolean quizAccess, InputStream bytea) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.fileAccess = fileAccess;
        this.quizAccess = quizAccess;
        this.bytea = bytea;
    }

    public int getFileId() {
        return fileId;
    }

    public String getFileName() {
        return fileName;
    }

    public Boolean getFileAccess() {
        return fileAccess;
    }

    public Boolean getQuizAccess() {
        return quizAccess;
    }

    public InputStream getBytea() {
        return bytea;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileAccess(Boolean fileAccess) { fileAccess = fileAccess;}

    public void setQuizAccess(Boolean quizAccess) {
        quizAccess = quizAccess;
    }

    public void setBytea(InputStream bytea) {
        this.bytea = bytea;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        File file = (File) o;
        return fileId == file.fileId &&
                Objects.equals(fileName, file.fileName) &&
                Objects.equals(quizAccess, file.quizAccess) &&
                Objects.equals(bytea, file.bytea);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fileId, fileName, quizAccess, bytea);
    }

    @Override
    public String toString() {
        return "File{" +
                "fileId=" + fileId +
                ", fileName='" + fileName + '\'' +
                ", FileAccess=" + fileAccess +
                ", QuizAccess=" + quizAccess +
                ", bytea=" + bytea +
                '}';
    }
}
