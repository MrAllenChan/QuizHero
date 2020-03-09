// test.js

import React , { Component } from 'react';
import PropTypes from 'prop-types';
class InputFileReader extends Component{
    constructor(){
        super();
        this.state = {
            src: '',
            value: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.inputFileChanged = this.inputFileChanged.bind(this);
    };
    handleClick(){
        let input = this.refs.input_reader;
        input.click();
    };
    inputFileChanged(e){
        if(window.FileReader){
            let file = e.target.files[0], reader = new FileReader(), self = this;
            reader.onload = function(r){
                self.setState({
                    src: r.target.result
                });
            }
            reader.readAsDataURL(file);
            self.setState({value:reader});
        }
        else {
            alert('Sorry, your browser does\'nt support for preview');
        }
    }
    render(){
        const { accept, capture, multiple } = this.props, { src, value } = this.state;
        return(
            <div>
                <img src={src} height={80} width={80}/>
                <button onClick={this.handleClick}>Upload</button>
                <input type="file" ref="input_reader" accept={Array.isArray(accept) ? accept.join(',') : accept} multiple={multiple} capture={capture} style={{display:'none'}} onChange={this.inputFileChanged}/>
            </div>
        );
    }
}

InputFileReader.defaultProps = {
    accept: '.md',
    capture: true,
    multiple: false
}

InputFileReader.propTypes = {
    accept: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    capture: PropTypes.bool,
    multiple: PropTypes.bool
}
export default InputFileReader;

// import React, { Component } from 'react'
// import ReactFileReader from 'react-file-reader';
//
// class Test extends Component {
//     constructor() {
//         super();
//         this.state = {
//             file : ""
//         }
//     }
//
//
//     handleFiles = files => {
//         this.setState({
//             file: files
//         })
//         console.log(this.state.file)
//     }
//     render() {
//         return(
//             <div className="files">
//                 <ReactFileReader handleFiles={this.handleFiles}>
//                     <button className='btn'>Upload</button>
//                 </ReactFileReader>
//
//                 <p>Read</p>
//                 <iframe src={this.state.file} frameBorder="0" height="400" width="100%" />
//             </div>
//         )
//     }
// }

// import marked from 'marked'
//
// const md = '### test'
//
// marked.setOptions({ // marked 设置
//     renderer: new marked.Renderer(),
//     gfm: true,
//     tables: true,
//     breaks: true,
//     pedantic: false,
//     sanitize: false,
//     smartLists: true,
//     smartypants: false
// })
//
// class Test extends Component {
//     render () {
//         const strHtml = marked(md)
//         return (
//             <div>
//                 <div>
//                     {strHtml}
//                 </div>
//             </div>
//         )
//     }
// }

// export default Test