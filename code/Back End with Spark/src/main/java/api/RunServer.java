package api;

/**
 * This driver can be used to run the API server on localhost,
 * for inspecting and manual testing through e.g. Postman application.
 */
public class RunServer {
    public static void main(String[] args) {
        WebServer server = new WebServer();
        server.start();
    }
}
