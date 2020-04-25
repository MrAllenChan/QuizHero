package model;

import java.io.InputStream;
import java.util.Objects;
import java.util.UUID;

public class File {
    private String fileId;
    private String fileName;
    private Boolean filePermission; // permission control of access to entire file
    private Boolean quizPermission; // permission control of access to all quizzes in a file
    private InputStream fileContent;

    public File(String fileName, InputStream fileContent) {
        this.fileId = generateUniqueFileId();
        this.fileName = fileName;
        this.fileContent = fileContent;
        this.filePermission = false; //default false;
        this.quizPermission = false; //default false;
    }

    public File(String fileId, String fileName, Boolean fileAccess, Boolean quizAccess, InputStream fileContent) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.filePermission = fileAccess;
        this.quizPermission = quizAccess;
        this.fileContent = fileContent;
    }

    private String generateUniqueFileId() {
        return UUID.randomUUID().toString();
    }

    public String getFileId() {
        return fileId;
    }

    public String getFileName() {
        return fileName;
    }

    public Boolean getFilePermission() {
        return filePermission;
    }

    public Boolean getQuizPermission() {
        return quizPermission;
    }

    public InputStream getFileContent() {
        return fileContent;
    }

    @Override
    public String toString() {
        return "File{" +
                "fileId='" + fileId + '\'' +
                ", fileName='" + fileName + '\'' +
                ", filePermission=" + filePermission +
                ", quizPermission=" + quizPermission +
                ", fileContent=" + fileContent +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        File file = (File) o;
        return Objects.equals(getFileId(), file.getFileId()) &&
                Objects.equals(getFileName(), file.getFileName()) &&
                Objects.equals(getFilePermission(), file.getFilePermission()) &&
                Objects.equals(getQuizPermission(), file.getQuizPermission()) &&
                Objects.equals(getFileContent(), file.getFileContent());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getFileId(), getFileName(), getFilePermission(), getQuizPermission(), getFileContent());
    }
}
