package model;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Quiz {

    private int id;
    private int fileId;
    private int questionId;
    private int A;
    private int B;
    private int C;
    private int D;
    private HashMap<Character,Integer> count;

    public Quiz(int fileId, int questionId) {
        this.fileId = fileId;
        this.questionId = questionId;
    }

    public Quiz(int fileId, int questionId, int a, int b, int c, int d) {
        this.fileId = fileId;
        this.questionId = questionId;
        A = a;
        B = b;
        C = c;
        D = d;
    }

    public Quiz(int fileId, int questionId, HashMap<Character, Integer> count) {
        this.fileId = fileId;
        this.questionId = questionId;
        this.count = count;
    }

    public int getA() {
        return A;
    }

    public int getB() {
        return B;
    }

    public int getC() {
        return C;
    }

    public int getD() {
        return D;
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

    public HashMap<Character, Integer> getCount() {
        return count;
    }

    public HashMap<Character, String> getStatistic(@NotNull HashMap<Character,Integer> count){
        int total=0;
        HashMap<Character,String> result = new HashMap<>();

        //get total students who answered
        for (Map.Entry mapElement : count.entrySet()) {
            total += (int)mapElement.getValue();
        }

        if(total == 0) return result;

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
}
