package model;

import java.util.Objects;


/**
 * Record class is used to manage the attributes of the record objects including the
 * correct answer to the corresponding question id, the question id and the id of the
 * file that contains the question.
 *
 * @author Ziming Chen, Nanxi Ye, Chenghao Sun
 * @version 1.0
 */
public class Record {

    private String fileId;
    private int questionId;
    private char choice;

    /**
     * This method is the constructor of the class
     *
     * @param fileId id for the file
     * @param questionId id for the question
     * @param choice choice that been selected
     */
    public Record(String fileId, int questionId, char choice){
        this.fileId = fileId;
        this.questionId = questionId;
        this.choice = choice;
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
     * named questionId
     */
    public int getQuestionId() {
        return questionId;
    }

    /**
     * This method is used to get the private variable value
     * named choice
     */
    public char getChoice() {
        return choice;
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
        Record record = (Record) o;
        return fileId == record.fileId &&
                questionId == record.questionId &&
                choice == record.choice;
    }

    /**
     * This method overrides the hashCode method of the class
     * to implement specific functionality of the hashCode function
     * to the class
     */
    @Override
    public int hashCode() {
        return Objects.hash(fileId, questionId, choice);
    }

    /**
     * This method overrides the toString method of the class
     * to display specific content of the class information
     */
    @Override
    public String toString() {
        return "Record{" +
                "fileId=" + fileId +
                ", questionId=" + questionId +
                ", choice=" + choice +
                '}';
    }
}
