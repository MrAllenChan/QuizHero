package api;

import dao.DaoFactory;
import java.nio.file.Paths;

public class RunServer {
    public static void main(String[] args) {
        DaoFactory.PATH_TO_DATABASE_FILE = Paths.get("src", "main", "resources").toFile().
                getAbsolutePath()
                + "/db/Store.db";
        DaoFactory.DROP_TABLES_IF_EXIST = false;
        ApiServer.INITIALIZE_WITH_SAMPLE_DATA = false;
        ApiServer.start();
    }
}
