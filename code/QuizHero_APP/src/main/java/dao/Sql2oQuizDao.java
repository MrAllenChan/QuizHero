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
    public List<Quiz> getQuizStatByFileId(int fileId) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM Quiz Where FileId = " +
                    fileId + ";";
            return conn.createQuery(sql).executeAndFetch(Quiz.class);
        }
        catch (Sql2oException ex) {
            throw new DaoException("Cannot find any quiz with file ID: " + fileId, ex);
        }
    }

    @Override
    public List<Quiz> getSingleQuizStat(int fileId, int questionId) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM Quiz Where FileId = " +
                    fileId + " AND QuestionId = " + questionId + ";";
            return conn.createQuery(sql).executeAndFetch(Quiz.class);
        }
        catch (Sql2oException ex) {
            throw new DaoException("Cannot find this single Quiz with file ID: " +
                    fileId + " and question ID: " + questionId, ex);
        }
    }


    @Override
    public List<Quiz> getAllQuizStat() {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM Quiz;";
            return conn.createQuery(sql).executeAndFetch(Quiz.class);
        }
    }

    @Override
    public void add(Quiz quiz) throws DaoException {

        System.out.println(quiz.toString());
        try (Connection conn = sql2o.open()) {
            String sql = "INSERT INTO Quiz(fileId, questionId, countA, countB, countC, countD) " +
                    "VALUES (:fileId, :questionId, :A, :B, :C, :D);";
            int id = (int) conn.createQuery(sql)
                    .addParameter("fileId", quiz.getFileId())
                    .addParameter("questionId", quiz.getQuestionId())
                    .addParameter("A", quiz.getCountA())
                    .addParameter("B", quiz.getCountB())
                    .addParameter("C", quiz.getCountC())
                    .addParameter("D", quiz.getCountD())
                    .executeUpdate()
                    .getKey();

//            int id = (int) conn.createQuery(sql)
//                    .bind(quiz)
//                    .executeUpdate()
//                    .getKey();

            quiz.setId(id);
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to add the course", ex);
        }
    }
}
