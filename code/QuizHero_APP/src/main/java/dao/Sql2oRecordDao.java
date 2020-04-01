package dao;

import exception.DaoException;
import model.Record;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;
import sun.util.resources.ext.CalendarData_hr;

import java.util.ArrayList;
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
//        get file id, question id and the answer of a student
        int fileId = record.getFileId();
        int questionId = record.getQuestionId();
        String choice = "count" + record.getChoice();
        Map<Character, Integer> map = new HashMap<>();
        map.put(record.getChoice(), 1);

//        Record tempRecord = new Record(9,9,'N');

        List<Map<String, Object>> listFromTable = new ArrayList<>();
//        Map<String,Object> tmp = new HashMap<>();
//        listFromTable.add(tmp);
        String sql = "SELECT * FROM Quiz WHERE fileId = " + fileId + " AND questionId = " + questionId + ";";
        try (Connection conn = sql2o.open()) {
            listFromTable = conn.createQuery(sql).executeAndFetchTable().asList();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to find this single quiz!", ex);
        }

        // record of a new Quiz question
        if (listFromTable.isEmpty()) {
            sql = "INSERT INTO Quiz(fileId, questionId, answer, countA, countB, countC, countD) " +
                    "VALUES (:fileId, :questionId, :answer, :countA, :countB, :countC, :countD);";
            try (Connection conn = sql2o.open()) {
                conn.createQuery(sql)
                        .addParameter("fileId", fileId)
                        .addParameter("questionId", questionId)
                        .addParameter("answer", "N/A")
                        .addParameter("countA", map.getOrDefault('A', 0))
                        .addParameter("countB", map.getOrDefault('B', 0))
                        .addParameter("countC", map.getOrDefault('C', 0))
                        .addParameter("countD", map.getOrDefault('D', 0))
                        .executeUpdate();
                System.out.println("New record inserted into Quiz table.");
            } catch (Sql2oException e2) {
                throw new DaoException("Unable to add new record to quiz", e2);
            }
        }
        else { // record of an existing quiz question
            sql = "UPDATE Quiz Set " + choice + " = " + choice + " + 1 " +
                    "WHERE fileId = " + fileId + " AND questionId = " + questionId;
            System.out.println(sql);
            try (Connection conn = sql2o.open()) {
                conn.createQuery(sql).executeUpdate();
                System.out.println("New record updated in Quiz table.");
            } catch (Sql2oException ex) {
                throw new DaoException("Unable to update record to Quiz table", ex);
            }
        }
    }
}
