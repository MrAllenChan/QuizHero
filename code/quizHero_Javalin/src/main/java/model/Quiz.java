package model;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Quiz {

    private int id;
    private int fileId;
    private int questionId;
    private int countA;
    private int countB;
    private int countC;
    private int countD;

//    private HashMap<Character,Integer> count;

    public int getCountA() {
        return countA;
    }

    public int getCountB() {
        return countB;
    }

    public int getCountC() {
        return countC;
    }

    public int getCountD() {
        return countD;
    }

    public Quiz(int fileId, int questionId) {
        this.fileId = fileId;
        this.questionId = questionId;
    }

    public Quiz(int fileId, int questionId, int countA, int countB, int countC, int countD) {
        this.fileId = fileId;
        this.questionId = questionId;
        this.countA = countA;
        this.countB = countB;
        this.countC = countC;
        this.countD = countD;
    }

    //    public Quiz(int fileId, int questionId, HashMap<Character, Integer> count) {
//        this.fileId = fileId;
//        this.questionId = questionId;
//        this.count = count;
//    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFileId() {
        return fileId;
    }

    public int getQuestionId() {
        return questionId;
    }

//    public HashMap<Character, Integer> getCount() {
//        return count;
//    }

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
