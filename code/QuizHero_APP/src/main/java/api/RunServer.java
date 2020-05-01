package api;

import dao.DaoFactory;
import java.net.URISyntaxException;
import java.nio.file.Paths;

/**
 * RunServer class is used to start the application
 * modify DaoFactory.DROP_TABLES_IF_EXIST or ApiServer.INITIALIZE_WITH_SAMPLE_DATA globally before starting;
 * @author Ziming Chen, Nanxi Ye, Chenghao Sun
 * @version 1.0
 */
public class RunServer {
    public static void main(String[] args) throws URISyntaxException {
        DaoFactory.PATH_TO_DATABASE_FILE = Paths.get("src", "main", "resources").toFile().
                getAbsolutePath()
                + "/db/Store.db";
        DaoFactory.DROP_TABLES_IF_EXIST = false;
        ApiServer.INITIALIZE_WITH_SAMPLE_DATA = false;
        ApiServer.start();
    }
}
