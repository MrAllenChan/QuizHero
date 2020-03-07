package model;

import java.util.HashMap;
import java.util.Objects;

public class Quiz {

    private int id;
    private int fileId;
    private int questionId;
    private HashMap count;

    public Quiz(int id, int fileId, int questionId) {
        this.id = id;
        this.fileId = fileId;
        this.questionId = questionId;
        this.count = new HashMap();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFileId() {
        return fileId;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public HashMap getCount() {
        return count;
    }

    public void setCount(HashMap count) {
        this.count = count;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Quiz quiz = (Quiz) o;
        return id == quiz.id &&
                fileId == quiz.fileId &&
                questionId == quiz.questionId &&
                Objects.equals(count, quiz.count);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fileId, questionId, count);
    }

    @Override
    public String toString() {
        return "Quiz{" +
                "id=" + id +
                ", fileId=" + fileId +
                ", questionId=" + questionId +
                ", count=" + count +
                '}';
    }
}
