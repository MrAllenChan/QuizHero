This is the implementation of backend section of this project using spark. Note that after discussion, we decide to use Node.js to develop our web server and Javalin (or springboot) to develop our application server. Therefore this implementation will be replaced in future.

###How to run our project

- In src/main/api, you will find the class RunServer. Run "Runserber.main" and go to http://localhost:4567/ in your browser. It directs you to a web page with a function of uploading local file. 
- Click on "choose file" and select a local markdown file. Click "upload". Now you would notice a url is created. 
- Switch back to IntelliJ, you can see the file you chose has been uploaded and saved under src/main/resources/. This indicates a successful connetion between the client and web server.

Idealy the created url should direct you to the html page that converts the markdown file you selected to a presentation-style html file. Since we decided to incorporate the upload function and markdown convertion function in frontend using react, this function is achieved following the steps in fronend.
