import Marpit from "@marp-team/marpit";

const marpitConvert=(rawString)=> {
    // this.setState({
    //     rawString : result
    // }, () => {this.separateQuestion();});
    // 1. Marpit
    const marpit = new Marpit();
    // 2. Add Marpit theme CSS
    const theme = `
        /* @theme example */

        section {
          background-color: #369;
          color: #fff;
          font-size: 30px;
          padding: 40px;
        }

    h1,
    h2 {
      text-align: center;
      margin: 0;
    }

    h1 {
      color: #8cf;
    }
    `
    marpit.themeSet.default = marpit.themeSet.add(theme)
    // 3. Render markdown
    const {html, css} = marpit.render(rawString);
    // 4. Use output in your HTML
    let filestring = `
        <!DOCTYPE html>
        <html><body>
          <style>${css}</style>
          ${html}
        </body></html>
        `
    ;
    return filestring;
}

export default marpitConvert;