import React from 'react';
import { render } from 'react-dom';
import { Upload, message, Button, Icon } from 'antd';
import Slides from "./Spectacle";

class BackButton extends React.Component{
    constructor(props) {
        super(props);
        this.callback3 = props.callback3;


    }
    OnClick =()=> {
        this.props.callback3();
    }
    render () {
        return (
            <Button
                onClick={this.OnClick}>
                <Icon /> Back to Slides
            </Button>
        )
    }

}
export default BackButton;