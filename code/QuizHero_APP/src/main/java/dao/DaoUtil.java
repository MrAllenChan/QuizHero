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
        quizDao.add(new Quiz(9, 1, "A", 10, 12, 6, 7));
        quizDao.add(new Quiz(99, 2, "B", 8, 3, 21, 9));
        quizDao.add(new Quiz(999, 1, "C", 5, 1, 6, 25));
        quizDao.add(new Quiz(9999, 1, "D", 11, 20, 2, 3));
//        quizDao.add(new Quiz(1,1, count));
    }
}
