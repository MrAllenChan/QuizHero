package dao;
import model.Quiz;
import model.Record;

import java.util.HashMap;

public final class DaoUtil {

    private DaoUtil() {
        // This class is not mean to be instantiated!
    }

    public static void addSampleQuizzes(QuizDao quizDao) {
//        HashMap<Character, Integer> count = new HashMap<>();
//        count.put('A', 5);
//        count.put('B', 12);
//        count.put('C', 6);
//        count.put('D', 100);
        quizDao.add(new Quiz(1, 1, 10, 12, 6, 7));
        quizDao.add(new Quiz(1, 2, 99, 2, 16, 8));
//        quizDao.add(new Quiz(1,1, count));
    }
}
