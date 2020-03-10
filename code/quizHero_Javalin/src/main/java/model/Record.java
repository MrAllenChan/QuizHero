package model;

import java.util.Objects;

public class Record {

    private int fileId;
    private int questionId;
    private char choice;

    public Record(int fileId, int questionId, char choice){
        this.fileId = fileId;
        this.questionId = questionId;
        this.choice = choice;
    }

    public int getFileId() {
        return fileId;
    }

    public int getQuestionId() {
        return questionId;
    }

    public char getChoice() {
        return choice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Record record = (Record) o;
        return fileId == record.fileId &&
                questionId == record.questionId &&
                choice == record.choice;
    }

    @Override
    public int hashCode() {
        return Objects.hash(fileId, questionId, choice);
    }

    @Override
    public String toString() {
        return "Record{" +
                "fileId=" + fileId +
                ", questionId=" + questionId +
                ", choice=" + choice +
                '}';
    }
}
