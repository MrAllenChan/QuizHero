import React from 'react';
import { render } from 'react-dom';
import { Upload, message, Button, Icon } from 'antd';
import defaultTheme from '../theme/default-theme';
import { Box, Deck, FlexBox, FullScreen, Markdown, Progress, Slide, Heading, Notes, CodePane} from '../lib';

/**
 * Set a template for Sepctacle <Flexbox>
 */
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


/**
 * Slides class to get slides data and render slides by using spectacle
 */
class Slides extends React.Component{
    constructor(props) {
        super(props);
        this.toQuizCallback = props.toQuizCallback;
        this.slides = props.slides;
        // this.beforeUpload.bind = this.beforeUpload.bind(this);

    }

    /**
     * The onclick function is to callback quiz page when click "start quiz".
     */
    onClick = () => {
        this.toQuizCallback(1);
        console.log(this.slides)
    }

    /**
     *The render function is to get composite slides data and render them as slides page using Spectacle.
     * @returns {*}
     */
    render(){
        const buttonStyle = {
            backgroundColor:"#ecc",
            width:"200px",
            height:"50px",
            margin:"0px 10px",
            boarderRadius:"3px",
            fontSize:"20px"
        };
        /**
         * Get slides data and composite slides data into <Slide> tag
         * @type {*[]}
         */
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
                    <Slide style={{backgroundColor:"#fff"}} align="flex-start">
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

        /**
         * return rendered slides page
         */
        return (

            <Deck loop theme={defaultTheme} template={template} transition={["slide"]}>
                {content}
            </Deck>
        );
    }

}

export default Slides;