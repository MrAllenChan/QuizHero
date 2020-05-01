package dao;

import exception.DaoException;
import model.Quiz;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;
import java.util.List;

public class Sql2oQuizDao implements QuizDao {
    private Sql2o sql2o;

    public Sql2oQuizDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public List<Quiz> getQuizStatByFileId(String fileId) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM quiz Where fileId = :fileId ORDER By questionId;";
            return conn.createQuery(sql)
                    .addParameter("fileId", fileId)
                    .executeAndFetch(Quiz.class);
        }
        catch (Sql2oException ex) {
            throw new DaoException("database error." + ex.getMessage(), ex);
        }
    }

    @Override
    public Quiz getSingleQuizStat(String fileId, int questionId) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM quiz Where fileId = :fileId AND questionId = :questionId;";
            return conn.createQuery(sql)
                    .addParameter("fileId", fileId)
                    .addParameter("questionId", questionId)
                    .executeAndFetchFirst(Quiz.class);
        }
        catch (Sql2oException ex) {
            throw new DaoException("Cannot find this single quiz with file ID: " +
                    fileId + " and question ID: " + questionId, ex);
        }
    }

    @Override
    public void add(Quiz quiz) throws DaoException {
        // handel the case that quiz is initialized with null fileId and questionId values
        String fileId = quiz.getFileId();
        int questionId = quiz.getQuestionId();
        if (fileId == null || fileId.length() == 0 || questionId == 0) {
            throw new DaoException("FileId and questionId can not be empty!");
        }

        Quiz singleQuiz = getSingleQuizStat(fileId, questionId);

        // quiz not exist then insert, otherwise throw DaoException
        if (singleQuiz == null) {
            try (Connection conn = sql2o.open()) {
                String sql = "INSERT INTO quiz(fileId, questionId, answer, countA, countB, countC, countD) " +
                        "VALUES (:fileId, :questionId, :answer, :A, :B, :C, :D);";
                conn.createQuery(sql, true)
                        .addParameter("fileId", quiz.getFileId())
                        .addParameter("questionId", quiz.getQuestionId())
                        .addParameter("answer", quiz.getAnswer())
                        .addParameter("A", quiz.getCountA())
                        .addParameter("B", quiz.getCountB())
                        .addParameter("C", quiz.getCountC())
                        .addParameter("D", quiz.getCountD())
                        .executeUpdate();

//                quiz.setId(id);
            } catch (Sql2oException ex) {
                throw new DaoException("Unable to add the quiz", ex);
            }
        } else {
            throw new DaoException("quiz already exists, unable to add this quiz");
        }
    }
}
