## Back-end: Some notes

This is the implementation of the back-end part of this project in iteration 1. We used SparkJava to develop the web server, and also implemented some simple front-end interfaces using html and hbs. Note that after the lastest discussion, we have decide to move onto Node.js to develop our web server and Javalin to develop our application server. Therefore, this implementation for back-end will be replaced in the future.

## How to run our back end

1. In src/main/api, you will find the class RunServer. Run "RunServer.main" and go to http://localhost:4567/ in your browser. It directs you to a web page with a function of uploading local file.
2. Click on "choose file" and select a local markdown file. Click "upload". Now you would notice a url is created.
3. Switch back to IntelliJ, you can see the file you chose has been uploaded and saved under src/main/resources/. This indicates a successful connetion between the client and web server.

Idealy, the created url should direct you to the html page that converts the markdown file to a presentation-style html file. Since we have decided to incorporate the upload function and markdown convertion function in frontend using react, this function will be achieved in front-end soon.
