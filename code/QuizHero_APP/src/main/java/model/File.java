package model;

import java.io.InputStream;
import java.util.Objects;

public class File {
    public int fileId;
    public String fileName;
    public Boolean quizAccess;
    //public Boolean fileAccess
    public InputStream bytea;


    public File(int fileId, String fileName, InputStream bytea) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.bytea = bytea;
        this.quizAccess = false; //default false;
    }

    public int getFileId() {
        return fileId;
    }

    public String getFileName() {
        return fileName;
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
                ", QuizAccess=" + quizAccess +
                ", bytea=" + bytea +
                '}';
    }
}
