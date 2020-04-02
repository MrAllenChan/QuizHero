import Marpit from "@marp-team/marpit";

// Marpit
const marpit = new Marpit();
// Add Marpit theme CSS
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