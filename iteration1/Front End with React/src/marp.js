// import Marpit from '@marp-team/marpit'
// import fs from 'fs'
// import React, {Component} from "react";
// import {Button, Icon, message, Upload} from "antd";
// import MyUpload from "./upload";
// import marked from "./marked";
//
// // 1. Create instance (with options if you want)
// const marpit = new Marpit()
//
// // 2. Add theme CSS
// const theme = `
// /* @theme example */
//
// section {
//   background-color: #369;
//   color: #fff;
//   font-size: 30px;
//   padding: 40px;
// }
//
// h1,
// h2 {
//   text-align: center;
//   margin: 0;
// }
//
// h1 {
//   color: #8cf;
// }
// `
// marpit.themeSet.default = marpit.themeSet.add(theme)
//
// // 3. Render markdown
// const markdown = `
//
// # Homework 1
//
// # Requirement Specification Document
//
// ## Problem Statement
//
// `
// const { html, css } = marpit.render(markdown)
//
// // 4. Use output in your HTML
// const htmlFile = `
// <!DOCTYPE html>
// <html><body>
//   <style>${css}</style>
//   ${html}
// </body></html>
// `
// // fs.writeFileSync('example.html', htmlFile.trim())
//
// class Convert extends Component {
//   render() {
//     return (
//         <div>
//           <div>
//             {htmlFile}
//           </div>
//         </div>
//     )
//   }
// }
//
// export default Convert
//
// // const props = {
// //   name: 'file',
// //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
// //   headers: {
// //     authorization: 'authorization-text',
// //   },
// //   onChange(info) {
// //     if (info.file.status !== 'uploading') {
// //       console.log(info.file, info.fileList);
// //     }
// //     if (info.file.status === 'done') {
// //       message.success(`${info.file.name} file uploaded successfully`);
// //     } else if (info.file.status === 'error') {
// //       message.error(`${info.file.name} file upload failed.`);
// //     }
// //   },
// // };
// //
// // class Convert extends React.Component{
// //   render() {
// //     return(
// //         <Convert {...{ html, css }}>
// //           <Button>
// //             <Icon type="convert" /> Click to convert
// //           </Button>
// //         </Convert>
// //     )
// //   }
// // }
//
// // export default Convert