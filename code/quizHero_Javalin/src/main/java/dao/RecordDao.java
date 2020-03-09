package dao;

import exception.DaoException;
import model.Record;


public interface RecordDao {
    void add(Record record) throws DaoException;
}
