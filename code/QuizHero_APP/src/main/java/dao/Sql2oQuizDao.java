package dao;

import exception.DaoException;
import model.Quiz;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.ArrayList;
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
            String sql = "SELECT * FROM Quiz Where fileId = " +
                    fileId + " ORDER By questionId;";
            return conn.createQuery(sql).executeAndFetch(Quiz.class);
        }
        catch (Sql2oException ex) {
            throw new DaoException("Cannot find any quiz with file ID: " + fileId, ex);
        }
    }

    @Override
    public List<Quiz> getSingleQuizStat(int fileId, int questionId) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM Quiz Where fileId = " +
                    fileId + " AND questionId = " + questionId + ";";
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

//        System.out.println(quiz.toString());

        int fileId = quiz.getFileId();
        int questionId = quiz.getQuestionId();
        String answer = quiz.getAnswer();
        List<Map<String, Object>> listFromTable;
        String sql = "SELECT * FROM Quiz WHERE fileId = " + fileId + " AND questionId = " + questionId + ";";
        try (Connection conn = sql2o.open()) {
            listFromTable = conn.createQuery(sql).executeAndFetchTable().asList();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to find this single quiz!", ex);
        }

        if (listFromTable.isEmpty()) {
            try (Connection conn = sql2o.open()) {
                sql = "INSERT INTO Quiz(fileId, questionId, answer, countA, countB, countC, countD) " +
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
                throw new DaoException("Unable to add the course", ex);
            }
        }
        // for now, uploading a markdown containing the same questionIds is not handled
        // update answer? reset counts? not decided yet
//        } else {
//            sql = "UPDATE Quiz Set " + answer + " = " + answer +
//                    "WHERE fileId = " + fileId + " AND questionId = " + questionId;
//            System.out.println(sql);
//            try (Connection conn = sql2o.open()) {
//                conn.createQuery(sql).executeUpdate();
//                System.out.println("New quiz updated in Quiz table.");
//            } catch (Sql2oException ex) {
//                throw new DaoException("Unable to update quiz to Quiz table", ex);
//            }
//        }

    }
}
