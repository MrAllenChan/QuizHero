import React from 'react';
import { render } from 'react-dom';
import { Upload, message, Button, Icon } from 'antd';
import Slides from "./Spectacle";

class BackButton extends React.Component{
    constructor(props) {
        super(props);
        // this.toSlidesCallback = props.toSlidesCallback;

    }
    OnClick =()=> {
        this.props.toSlidesCallback();
    }
    render () {
        return (
            <Button
                onClick={this.OnClick}>
                Back to Slides
            </Button>
        )
    }

}

export default BackButton;