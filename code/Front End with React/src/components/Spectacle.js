import React from 'react';
import { render } from 'react-dom';
import { Upload, message, Button, Icon } from 'antd';
import defaultTheme from '../theme/default-theme';
import { Box, Deck, FlexBox, FullScreen, Markdown, Progress, Slide, Heading, Notes} from '../lib';
// import createTheme from 'spectacle/lib/themes/default';

// import createTheme from 'spectacle-theme-nova';
 

// const customStyles = {
//     global: {
//       body: { background: 'white' }
//     }
//   };
// const myTheme = createTheme(null, customStyles);

// SPECTACLE_CLI_THEME_START
const theme = {
    colors: {
        primary: '#f00', // header color
        secondary: '#00f', // paragraph color
        tertiary: '#fff', // background color
        quaternary: '#000' // hyperlink color
    },
    fontSizes: {
        h1: '70px',
        h2: '40px',
        text:'30px',
        header: '64px',
        paragraph: '28px'
    }
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
        <Box padding="0 1em" >
            <FullScreen color="#000"/>
        </Box>
        <Box padding="1em">
            <Progress color="#000"/>
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
        this.toQuizCallback = props.toQuizCallback;
        this.slides = props.slides;
        // this.beforeUpload.bind = this.beforeUpload.bind(this);

    }

    onClick = () => {
        this.toQuizCallback(1);
        console.log(this.slides)
    }

    render(){
        const buttonStyle = {
            backgroundColor:"#ecc",
            width:"200px",
            height:"50px",
            margin:"0px 10px",
            boarderRadius:"3px",
            fontSize:"20px"
        };

        const content = [];
        var quizBlockCount = 0;
        for (var i = 0; i < this.slides.length; i ++) {
            var data = this.slides[i];
            var slideBlock = data.split("---\n\n");
            console.log(slideBlock);
            if (slideBlock[slideBlock.length - 1] === "$$$quiz$$$\n\n") {
                const count = quizBlockCount
                slideBlock.splice(slideBlock.length - 1, 1);
                data = slideBlock.join("---\n\n");
                content.push(
                    <Markdown containsSlides>{data}</Markdown>

                )
                content.push(
                    <Slide style={{backgroundColor:"#fff"}}>
                        <Heading>Now lets do some funny quizzes!</Heading>
                        <Heading>
                            <Button
                                onClick={() => {this.toQuizCallback(count)}} style={buttonStyle}>
                                <Icon /> Click to start quiz
                            </Button>
                        </Heading>

                    </Slide>
                )
                quizBlockCount ++;
            } else {
                content.push(

                    <Markdown containsSlides>{data}</Markdown>

                )
            }


        }


        return (
            // <Deck loop theme={defaultTheme} template={template}>
            //
            //     <Markdown containsSlides>{this.slides}</Markdown>
            //     {/*quiz reminder page*/}
            //     <Slide backgroundColor={"#fff"}>
            //         <Heading>Now lets do some funny quizzes!</Heading>
            //         <Heading>
            //             <Button
            //                 onClick={this.onClick} style={buttonStyle}>
            //                 <Icon /> Click to start quiz
            //             </Button>
            //         </Heading>
            //
            //     </Slide>
            //     <Markdown containsSlides>{this.slides}</Markdown>
            // </Deck>
            <Deck loop theme={theme} template={template} transition={["slide"]}>
                {content}
            </Deck>
        );
    }
    // render (<Presentation />, document.getElementById('root'));
}

export default Slides;