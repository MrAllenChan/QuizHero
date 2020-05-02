/**
 * Using Marpit component to render static HTML slides for download
 */

import Marpit from "@marp-team/marpit";

/**
 * marpitConvert create new marpit variable, get data and add theme to it.
 */
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

    /**
     * render markdown using marpit
     */
    const {html, css} = marpit.render(rawString);

    /**
     * create filestring to store HTML string
     * @type {string}
     */
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