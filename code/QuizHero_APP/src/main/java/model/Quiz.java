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

    public Quiz(String fileId, int questionId) {
        this.fileId = fileId;
        this.questionId = questionId;
    }

    public Quiz(String fileId, int questionId, String answer, int countA, int countB, int countC, int countD) {
        this.fileId = fileId;
        this.questionId = questionId;
        this.answer = answer;
        this.countA = countA;
        this.countB = countB;
        this.countC = countC;
        this.countD = countD;
    }

    public String getAnswer() {return answer;}

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

    public String getFileId() {
        return fileId;
    }

    public int getQuestionId() {
        return questionId;
    }

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

    @Override
    public int hashCode() {
        return Objects.hash(fileId, questionId, answer, countA, countB, countC, countD);
    }
}
