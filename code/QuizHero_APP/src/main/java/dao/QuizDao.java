package dao;

import model.Quiz;
import model.Record;

import java.util.List;

/**
 * QuizDao interface defines methods related to the quiz table
 * e.g. add a quiz, update quiz statistics, get quiz statistics
 * @author Ziming Chen, Nanxi Ye, Chenghao Sun
 * @version 1.0
 */
public interface QuizDao {
    /**
     * This method is used to add a quiz to the quiz table in database
     * @param quiz an instance of Quiz class
     */
    void add(Quiz quiz);

    /**
     * This method is used to update the quiz data in quiz table from database
     * @param record an instance of Record class
     */
    void updateQuizStat(Record record);

    /**
     * This method is used to select all quiz with input fileId from database
     * @param fileId String unique id of a File instance
     * @return List of Quiz classes
     */
    List<Quiz> getQuizStatByFileId(String fileId);

    /**
     * This method is used to get one quiz data with input fileId and questionId from database
     * @param fileId String unique id of a File instance
     * @param questionId int id of question in the quiz
     * @return an instance of Quiz
     */
    Quiz getSingleQuizStat(String fileId, int questionId);
}
