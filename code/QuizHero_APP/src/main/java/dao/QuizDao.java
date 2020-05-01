package dao;

import model.Quiz;
import model.Record;

import java.util.List;

public interface QuizDao {
    void add(Quiz quiz);
    void updateQuizStat(Record record);
    List<Quiz> getQuizStatByFileId(String fileId);
    Quiz getSingleQuizStat(String fileId, int questionId);
}
