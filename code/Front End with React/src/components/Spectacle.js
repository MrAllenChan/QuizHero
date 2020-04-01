import React from 'react';
import { render } from 'react-dom';
import { Upload, message, Button, Icon } from 'antd';

import { Box, Deck, FlexBox, FullScreen, Markdown, Progress, Slide, Heading } from 'spectacle';

// SPECTACLE_CLI_MD_START
// import mdContent from './slides.md';
// SPECTACLE_CLI_MD_END

// SPECTACLE_CLI_THEME_START
const theme = {};
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

const Presentation = () => (
    <Deck loop theme={theme} template={template}>
        {/*<Markdown containsSlides>{mdContent}</Markdown>*/}
        <Slide>
            <Heading>Welcome to Spectacle</Heading>
        </Slide>
        <Slide>
            <Heading>Next, We will do some in class quiz</Heading>
            <Upload>
                <Button>
                    <Icon type = 'upload' /> Click to Next page
                </Button>
            </Upload>
        </Slide>
    </Deck>
);

class Slides extends React.Component{
    render(){
        return (<Presentation />);
    }
    // render (<Presentation />, document.getElementById('root'));
}

export default Slides;