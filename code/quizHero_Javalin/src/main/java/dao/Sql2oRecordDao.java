package dao;

import exception.DaoException;
import model.Record;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

public class Sql2oRecordDao implements RecordDao {
    private Sql2o sql2o;

    public Sql2oRecordDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public void add(Record record) throws DaoException {
//        char answer = record.getChoice();
//
//        try (Connection conn = sql2o.open()) {
//            String sql = "INSERT INTO Quizzes(fileId, questionId, A, B, C, D) VALUES(:name, :url);";
//            int id = (int) conn.createQuery(sql)
//                    .bind(record)
//                    .executeUpdate()
//                    .getKey();
//            record.setId(id);
//        } catch (Sql2oException ex) {
//            throw new DaoException("Unable to add record to quiz", ex);
//        }
        int fileId = record.getFileId();
        int questionId = record.getQuestionId();
        char answer = record.getChoice();
        String sql = null;
        switch(answer) {
            case 'A':
                sql = "UPDATE Quizzes SET A = A + 1 WHERE fileId = " + fileId + "&& questionId = " + questionId;
                break;
            case 'B':
                sql = "UPDATE Quizzes SET A = B + 1 WHERE fileId = " + fileId + "&& questionId = " + questionId;
                break;
            case 'C':
                sql = "UPDATE Quizzes SET A = C + 1 WHERE fileId = " + fileId + "&& questionId = " + questionId;
                break;
            case 'D':
                sql = "UPDATE Quizzes SET A = D + 1 WHERE fileId = " + fileId + "&& questionId = " + questionId;
                break;
        }
        try (Connection conn = sql2o.open()) {
            int id = (int) conn.createQuery(sql)
                    .bind(record)
                    .executeUpdate()
                    .getKey();
            record.setId(id);
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to add record to quiz", ex);
        }
    }
}
