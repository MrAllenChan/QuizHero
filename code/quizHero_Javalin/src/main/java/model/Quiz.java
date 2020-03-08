package model;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Quiz {

    private int id;
    private int fileId;
    private int questionId;
    private HashMap<Character,Integer> count;

    public Quiz(int id, int fileId, int questionId) {
        this.id = id;
        this.fileId = fileId;
        this.questionId = questionId;
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

    public HashMap<Character,Integer> getCount() {
        return count;
    }


    public HashMap<Character,String> getStatistic(@NotNull HashMap<Character,Integer> count){
        int total=0;
        HashMap<Character,String> result = new HashMap<>();

        //get total students who answered
        for (Map.Entry mapElement : count.entrySet()) {
            total += (int)mapElement.getValue();
        }

        if(total==0) return result;

        for (Map.Entry mapElement : count.entrySet()) {
            char key = (char)mapElement.getKey();
            int value = (int)mapElement.getValue();

            String showResult = "";

            showResult = String.valueOf(Math.round(value/total));
            showResult += "%";

            result.put(key,showResult);
        }

            return result;
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
