package dao;

import exception.DaoException;
import model.Quiz;
import model.Record;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Sql2oRecordDao implements RecordDao {
    private Sql2o sql2o;

    public Sql2oRecordDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public void add(Record record) throws DaoException {
        // get file id, question id and the answer of a student
        int fileId = record.getFileId();
        int questionId = record.getQuestionId();
        String choice = "count" + record.getChoice();
        List<Quiz> listFromTable;

        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM Quiz Where fileId = " +
                    fileId + " AND questionId = " + questionId + ";";
            listFromTable = conn.createQuery(sql).executeAndFetch(Quiz.class);
        } catch (Sql2oException ex) {
            throw new DaoException("database connection error", ex);
        }
        // quiz not exists, update failure
        if (listFromTable.isEmpty()) {
            throw new DaoException("Quiz not exists, unable to update using this record.", new Sql2oException());
        }

        // update Quiz table using the incoming record
        String sql = "UPDATE Quiz Set " + choice + " = " + choice + " + 1 WHERE " +
                "fileId = :fileId AND questionId = :questionId";
        System.out.println(sql);
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql)
                    .addParameter("fileId", fileId)
                    .addParameter("questionId", questionId)
                    .executeUpdate();
            System.out.println("New record updated in Quiz table.");
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to update record to Quiz table", ex);
        }
    }

    public void test(Sql2o sql2o) {
        this.sql2o = sql2o;
    }
}
