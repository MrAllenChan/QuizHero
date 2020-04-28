package dao;

import exception.DaoException;
import model.Quiz;

import java.util.List;

public interface QuizDao {
    void add(Quiz quiz) throws DaoException;
    List<Quiz> getQuizStatByFileId(String fileId);
    Quiz getSingleQuizStat(String fileId, int questionId);
}
