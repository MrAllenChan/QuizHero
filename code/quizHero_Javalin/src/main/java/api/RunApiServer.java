package api;

import dao.DaoFactory;

import java.nio.file.Paths;

/**
 * This driver can be used to run the API server on localhost,
 * for inspecting and manual testing through e.g. Postman application.
 */
public class RunApiServer {
  public static void main(String[] args) {
    DaoFactory.DROP_TABLES_IF_EXIST = true;
    DaoFactory.PATH_TO_DATABASE_FILE = Paths.get("src", "main", "resources").toFile().getAbsolutePath()
        + "/db/Store.db";
    ApiServer.INITIALIZE_WITH_SAMPLE_DATA = true;
    ApiServer.start();
  }
}
