package dao;

import exception.DaoException;
import model.Quiz;

import java.util.List;

public interface QuizDao {
    void add(Quiz quiz) throws DaoException;
    List<Quiz> getAllQuizStat();
    List<Quiz> getQuizStatByFileId(int fileId);
    Quiz getSingleQuizStat(int fileId, int questionId);
}
