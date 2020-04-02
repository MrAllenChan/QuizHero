import React from 'react';
import { render } from 'react-dom';
import { Upload, message, Button, Icon } from 'antd';

import { Box, Deck, FlexBox, FullScreen, Markdown, Progress, Slide, Heading, Notes} from 'spectacle';

// SPECTACLE_CLI_MD_START
// import mdContent from './questions.md';
// SPECTACLE_CLI_MD_END
const mdContent = `> Question: What is your favorite course?`
// SPECTACLE_CLI_THEME_START
console.log(mdContent)
const theme = {
    // colors: {
    //     primary: '#f00',
    //     secondary: '#00f'
    // }
};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
    <FlexBox
        justifyContent="space-between"
        position="absolute"
        bottom={0}
        width={1}
    >
        <Box padding="0 1em">
            <FullScreen />
        </Box>
        <Box padding="1em">
            <Progress />
        </Box>
    </FlexBox>
);

// SPECTACLE_CLI_TEMPLATE_END

// const Presentation = () => (
//     <Deck loop theme={theme} template={template}>
//         {/*<Markdown containsSlides>{mdContent}</Markdown>*/}
//         <Slide>
//             <Heading>Welcome to Spectacle</Heading>
//         </Slide>
//         <Slide>
//             <Heading>Next, We will do some in class quiz</Heading>
//             <Upload>
//                 <Button
//                     onDownload={this.onDownload}>
//                     <Icon type = 'upload' /> Click to Next page
//                 </Button>
//             </Upload>
//         </Slide>
//     </Deck>
// );

class Slides extends React.Component{
    constructor(props) {
        super(props);
        this.callback2 = props.callback2;
        this.slides = props.slidesString;
        // this.beforeUpload.bind = this.beforeUpload.bind(this);

    }

    onClick = () => {
        this.props.callback2(1);
    }

    render(){
        console.log(mdContent)
        const buttonStyle = {
            backgroundColor:"#ecc",
            width:"200px",
            height:"50px",
            margin:"0px 10px",
            boarderRadius:"3px",
            fontSize:"20px"
        };
        return (
            <Deck loop theme={theme} template={template}>

                <Markdown containsSlides>{this.slides}</Markdown>
                {/*<Slide>*/}
                {/*    <Heading>Welcome to Spectacle</Heading>*/}

                {/*</Slide>*/}
                <Slide>
                    <Heading>Next, We will do some in class quiz</Heading>
                    <Heading>
                        <Button
                            onClick={this.onClick} style={buttonStyle}>
                            <Icon /> Click to start quiz
                        </Button>
                    </Heading>

                </Slide>
                <Markdown containsSlides>{this.slides}</Markdown>
            </Deck>
        );
    }
    // render (<Presentation />, document.getElementById('root'));
}

export default Slides;