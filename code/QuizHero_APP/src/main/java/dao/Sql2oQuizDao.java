package dao;

import exception.DaoException;
import model.Quiz;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;
import org.sql2o.data.Table;

import java.util.List;
import java.util.Map;

public class Sql2oQuizDao implements QuizDao {
    private Sql2o sql2o;

    public Sql2oQuizDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public List<Quiz> getQuizStatByFileId(int fileId) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM quiz Where fileId = " +
                    fileId + " ORDER By questionId;";
            return conn.createQuery(sql).executeAndFetch(Quiz.class);
        }
        catch (Sql2oException ex) {
            throw new DaoException("Cannot find any quiz with file ID: " + fileId, ex);
        }
    }

    @Override
    public Quiz getSingleQuizStat(int fileId, int questionId) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM quiz Where fileId = " +
                    fileId + " AND questionId = " + questionId + ";";
            return conn.createQuery(sql).executeAndFetchFirst(Quiz.class);
        }
        catch (Sql2oException ex) {
            throw new DaoException("Cannot find this single quiz with file ID: " +
                    fileId + " and question ID: " + questionId, ex);
        }
    }

    @Override
    public List<Quiz> getAllQuizStat() {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM quiz;";
            return conn.createQuery(sql).executeAndFetch(Quiz.class);
        }
    }

    @Override
    public void add(Quiz quiz) throws DaoException {

//        System.out.println(quiz.toString());

        int fileId = quiz.getFileId();
        int questionId = quiz.getQuestionId();
        //handel the case that quiz is initialized with null fileId and questionId values
        if (fileId == 0 || questionId == 0) {
            throw new DaoException("FileId and questionId can not be 0!");
        }
        String answer = quiz.getAnswer();
        List<Map<String, Object>> listFromTable;
        String sql = "SELECT * FROM quiz WHERE fileId = " + fileId + " AND questionId = " + questionId + ";";
        try (Connection conn = sql2o.open()) {
            Table table = conn.createQuery(sql).executeAndFetchTable();
            listFromTable = table.asList();

        } catch (Sql2oException ex) {
            throw new DaoException("Unable to add quiz!", ex);
        }

//        List<Quiz> listFromTable  = getSingleQuizStat(fileId, questionId);

        // quiz not exist then insert, otherwise throw DaoException
        if (listFromTable.isEmpty()) {
            try (Connection conn = sql2o.open()) {
                sql = "INSERT INTO quiz(fileId, questionId, answer, countA, countB, countC, countD) " +
                        "VALUES (:fileId, :questionId, :answer, :A, :B, :C, :D);";
                int id = (int) conn.createQuery(sql, true)
                        .addParameter("fileId", quiz.getFileId())
                        .addParameter("questionId", quiz.getQuestionId())
                        .addParameter("answer", quiz.getAnswer())
                        .addParameter("A", quiz.getCountA())
                        .addParameter("B", quiz.getCountB())
                        .addParameter("C", quiz.getCountC())
                        .addParameter("D", quiz.getCountD())
                        .executeUpdate()
                        .getKey();

                quiz.setId(id);

            } catch (Sql2oException ex) {
                throw new DaoException("Unable to add the quiz", ex);
            }
        } else {
            throw new DaoException("quiz already exists");
        }
    }
}
