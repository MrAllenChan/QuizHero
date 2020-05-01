package model;
import java.util.Objects;

// A Quiz object corresponds to a single question in a file
public class Quiz {
    private String fileId;
    private int questionId;
    private String answer;
    private int countA;
    private int countB;
    private int countC;
    private int countD;

    /**
     * This method is the constructor of the class
     *
     * @param fileId id for the file
     * @param questionId id for the question
     */
    public Quiz(String fileId, int questionId) {
        this.fileId = fileId;
        this.questionId = questionId;
    }

    /**
     * This method is the constructor of the class
     *
     * @param fileId id for the file
     * @param questionId id for the question
     * @param answer the answer recorded
     * @param countA the count of choice A
     * @param countB the count of choice B
     * @param countC the count of choice C
     * @param countD the count of choice D
     */
    public Quiz(String fileId, int questionId, String answer, int countA, int countB, int countC, int countD) {
        this.fileId = fileId;
        this.questionId = questionId;
        this.answer = answer;
        this.countA = countA;
        this.countB = countB;
        this.countC = countC;
        this.countD = countD;
    }

    /**
     * This method is used to get the value of private variable
     * named answer
     */
    public String getAnswer() {return answer;}

    /**
     * This method is used to set the value of private variable
     * named answer
     */
    public String setAnswer() {return answer;}

    /**
     * This method is used to get the value of private variable
     * named countA
     */
    public int getCountA() {
        return countA;
    }

    /**
     * This method is used to get the value of private variable
     * named countB
     */
    public int getCountB() {
        return countB;
    }

    /**
     * This method is used to get the value of private variable
     * named countC
     */
    public int getCountC() {
        return countC;
    }

    /**
     * This method is used to get the value of private variable
     * named countD
     */
    public int getCountD() {
        return countD;
    }

    /**
     * This method is used to get the value of private variable
     * named fileId
     */
    public String getFileId() {
        return fileId;
    }

    /**
     * This method is used to get the value of private variable
     * named questionId
     */
    public int getQuestionId() {
        return questionId;
    }


    /**
     * This method overrides the toString method of the class
     * to display specific content of the class information
     */
    @Override
    public String toString() {
        return "Quiz{" +
                ", fileId=" + fileId +
                ", questionId=" + questionId +
                ", answer='" + answer + '\'' +
                ", countA=" + countA +
                ", countB=" + countB +
                ", countC=" + countC +
                ", countD=" + countD +
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
        Quiz quiz = (Quiz) o;
        return fileId.equals(quiz.fileId) &&
                questionId == quiz.questionId &&
                countA == quiz.countA &&
                countB == quiz.countB &&
                countC == quiz.countC &&
                countD == quiz.countD &&
                Objects.equals(answer, quiz.answer);
    }

    /**
     * This method overrides the hashCode method of the class
     * to implement specific functionality of the hashCode function
     * to the class
     */
    @Override
    public int hashCode() {
        return Objects.hash(fileId, questionId, answer, countA, countB, countC, countD);
    }
}
