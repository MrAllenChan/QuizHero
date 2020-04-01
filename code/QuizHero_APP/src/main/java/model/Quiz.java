package model;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

// A Quiz object corresponds to a single question in a file
public class Quiz {

    private int id;
    private int fileId;
    private int questionId;
    private String answer;
    private int countA;
    private int countB;
    private int countC;
    private int countD;
    private HashMap<Character, String> count;
//    private HashMap<Character, String> statistics;

    public Quiz(int fileId, int questionId) {
        this.fileId = fileId;
        this.questionId = questionId;
    }

    public Quiz(int fileId, int questionId, String answer, int countA, int countB, int countC, int countD) {
        this.fileId = fileId;
        this.questionId = questionId;
        this.answer = answer;
        this.countA = countA;
        this.countB = countB;
        this.countC = countC;
        this.countD = countD;
        getCountMap();
//        statistics = calPercentage();
    }

    public String getAnswer() {return answer;}

    public String setAnswer() {return answer;}

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

    public void getCountMap() {
        count = new HashMap<>();
        DecimalFormat df = new DecimalFormat("0.00");
        float total = countA + countB + countC + countD;
        count.put('A', df.format(countA / total * 100) + "%");
        count.put('B', df.format(countB / total * 100) + "%");
        count.put('C', df.format(countC / total * 100) + "%");
        count.put('D', df.format(countD / total * 100) + "%");
        for (String val : count.values()) {
            System.out.println(val);
        }
    }

//    public HashMap<Character, String> calPercentage(){
//        int total = 0;
//        HashMap<Character, String> result = new HashMap<>();
//
//        // get the total number of students who answered this Quiz question
//        for (Integer num : count.values()) {
//            total += num;
//        }
//
//        if (total == 0) return result;
//
//        for (Map.Entry<Character, Integer> entry : count.entrySet()) {
//            char key = entry.getKey();
//            int value = entry.getValue();
//
//            String percentage = "";
//
//            percentage = String.valueOf((float)value/(float)total);
//            percentage += "%";
//
//            result.put(key, percentage);
//        }
//
//        return result;
//    }
}
