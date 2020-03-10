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
    public List<Quiz> getQuizStat() {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM Quiz;";
            return conn.createQuery(sql).executeAndFetch(Quiz.class);
        }
    }

    @Override
    public void add(Quiz quiz) throws DaoException {
//        int A = quiz.getCount().get('A'), B = quiz.getCount().get('B'),
//                C = quiz.getCount().get('C'), D = quiz.getCount().get('D');
        System.out.println(quiz);
        try (Connection conn = sql2o.open()) {
            String sql = "INSERT INTO Quiz(fileId, questionId, A, B, C, D) VALUES (:fileId, :questionId, :A, :B, :C, :D);";
            int id = (int) conn.createQuery(sql)
                    .addParameter("fileId", quiz.getFileId())
                    .addParameter("questionId", quiz.getQuestionId())
                    .addParameter("A", quiz.getCount().get('A'))
                    .addParameter("B", quiz.getCount().get('B'))
                    .addParameter("C", quiz.getCount().get('C'))
                    .addParameter("D", quiz.getCount().get('D'))
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
