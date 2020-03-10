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
        String sql = "UPDATE Quiz SET " + answer + " = " + answer + " + 1 " + "WHERE fileId = " + fileId + " AND questionId = " + questionId;
        System.out.println(sql);
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to add record to quiz", ex);
        }
    }
}
