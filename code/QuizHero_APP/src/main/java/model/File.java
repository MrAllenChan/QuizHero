package model;

import java.io.InputStream;
import java.util.Objects;
import java.util.UUID;

public class File {
    private int instructorId;
    private String fileId;
    private String fileName;
    private Boolean filePermission; // permission control of access to entire file
    private Boolean quizPermission; // permission control of access to all quizzes in a file
    private InputStream fileContent;


    /**
     * This method is the constructor of the class
     *
     * @param instructorId id for instructor
     * @param fileName name of the file
     * @param fileContent contents of the file
     */
    public File(int instructorId, String fileName, InputStream fileContent) {
        this.instructorId = instructorId;
        this.fileId = generateUniqueFileId();
        this.fileName = fileName;
        this.fileContent = fileContent;
        this.filePermission = false; // default false;
        this.quizPermission = false; // default false;
    }

    /**
     * This method is the constructor of the class
     *
     * @param instructorId id for instructor
     * @param fileId id of the file
     * @param fileName name of the file
     * @param fileContent contents of the file
     * @param fileAccess access permission of the file
     * @param quizAccess access permission of the quiz
     */
    public File(int instructorId, String fileId, String fileName, Boolean fileAccess, Boolean quizAccess, InputStream fileContent) {
        this.instructorId = instructorId;
        this.fileId = fileId;
        this.fileName = fileName;
        this.filePermission = fileAccess;
        this.quizPermission = quizAccess;
        this.fileContent = fileContent;
    }

    /**
     * This method is used to generated the UUID of the file
     * to be used as file id
     */
    private String generateUniqueFileId() {
        return UUID.randomUUID().toString();
    }

    /**
     * This method is used to get the private variable value
     * named instructorId
     */
    public Integer getInstructorId() {
        return instructorId;
    }

    /**
     * This method is used to get the private variable value
     * named fileId
     */
    public String getFileId() {
        return fileId;
    }

    /**
     * This method is used to get the private variable value
     * named fileName
     */
    public String getFileName() {
        return fileName;
    }

    /**
     * This method is used to get the private variable value
     * named filePermission
     */
    public Boolean getFilePermission() {
        return filePermission;
    }

    /**
     * This method is used to get the private variable value
     * named quizPermission
     */
    public Boolean getQuizPermission() {
        return quizPermission;
    }

    /**
     * This method is used to get the private variable value
     * named fileContent
     */
    public InputStream getFileContent() {
        return fileContent;
    }


    /**
     * This method overrides the toString method of the class
     * to display specific content of the class information
     */
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

    /**
     * This method overrides the equals method of the class
     * to implement specific functionality of the equals function
     * to the class
     */
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

    /**
     * This method overrides the hashCode method of the class
     * to implement specific functionality of the hashCode function
     * to the class
     */
    @Override
    public int hashCode() {
        return Objects.hash(getFileId(), getFileName(), getFilePermission(), getQuizPermission(), getFileContent());
    }
}
