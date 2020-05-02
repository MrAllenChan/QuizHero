package api;

import controller.FileHelper;
import spark.ModelAndView;
import spark.template.handlebars.HandlebarsTemplateEngine;
import spark.utils.IOUtils;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.Part;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

public class WebServer {
    public FileHelper file;

    public WebServer() {
        this.file = new FileHelper();
    }

    public void start() {
        getHomepage();
        receiveFile();
        publishUrl();
    }

    public void getHomepage() {
        // homepage
        get("/", ((request, response) -> {
            Map<String, String> model = new HashMap<>();
            model.put("url", file.getUrl());
            return new ModelAndView(model, "index.hbs");
        }), new HandlebarsTemplateEngine());
    }

    public void publishUrl() {
        // notes page that has been converted into html
        get("/teacher/notes", ((request, response) -> {
            return new ModelAndView(null, file.getPath());
        }),  new HandlebarsTemplateEngine());
    }

    public void receiveFile() {
        post("/api/upload", ((request, response) -> {
            request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("upload"));
            Part filePart = request.raw().getPart("myfile");

            try (InputStream inputStream = filePart.getInputStream()) {
                OutputStream outputStream = new FileOutputStream(
                         "./src/main/resources/templates/upload_" + filePart.getSubmittedFileName());
                IOUtils.copy(inputStream, outputStream);
                outputStream.close();
            }

            // todo: set path of the uploaded file
            file.setPath("upload_" + filePart.getSubmittedFileName());
            // todo: reset url of html page
            file.setUrl("/teacher/notes");
            // todo: redirect to the home page
            response.redirect("/");
            return null;
        }), new HandlebarsTemplateEngine());
    }
}
