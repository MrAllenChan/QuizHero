package api;

import dao.DaoFactory;

import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.sql.SQLException;

public class RunServer {
    public static void main(String[] args) throws URISyntaxException, SQLException {
        DaoFactory.PATH_TO_DATABASE_FILE = Paths.get("src", "main", "resources").toFile().
                getAbsolutePath()
                + "/db/Store.db";
//        DaoFactory.DROP_TABLES_IF_EXIST = false;
//        ApiServer.INITIALIZE_WITH_SAMPLE_DATA = false;
        ApiServer.start();
    }
}
