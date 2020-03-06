## Front-end: Some notes

This is the implementation of the front-end part of this project in iteration 1. The front-end was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). We use an industrial React UI library `antd`, which contains a set of high quality components to develop our front-end. Marpit is credited for helping us creating slide deck from Markdown. 

## How to run our front end

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you encountered error loading the page, please run the following command to ensure that you have included the necessary external library:

### ` npm install @marp-team/marpit --save`

And again run:

### `npm start`

I'm sure you will have a start index page shown in your browser with our logo "Quiz Hero" and a upload button, you can upload any Markdown file and it will be convert to a slide format html. Currently, we are still on our way of development, the converted html can only be seen if you click the download button and open the downloaded html file.

We haven't finalized our Markdown syntax yet, so a random Markdown may not give you an ideal converted html slides. We would introduce our syntax in detail after we finalize it. Therefore, we recommend you to use the `example.md` to test the current function. You can find it in the project directory.

---

## Back-end: Some notes

This is the implementation of the back-end part of this project in iteration 1. We used SparkJava to develop the web server, and also implemented some simple front-end interfaces using html and hbs. Note that after the lastest discussion, we have decide to move onto Node.js to develop our web server and Javalin to develop our application server. Therefore, this implementation for back-end will be replaced in the future.

## How to run our back end

1. In src/main/api, you will find the class RunServer. Run "RunServer.main" and go to http://localhost:4567/ in your browser. It directs you to a web page with a function of uploading local file.
2. Click on "choose file" and select a local markdown file. Click "upload". Now you would notice a url is created.
3. Switch back to IntelliJ, you can see the file you chose has been uploaded and saved under src/main/resources/. This indicates a successful connetion between the client and web server.

Idealy, the created url should direct you to the html page that converts the markdown file to a presentation-style html file. Since we have decided to incorporate the upload function and markdown convertion function in frontend using react, this function will be achieved in front-end soon.
