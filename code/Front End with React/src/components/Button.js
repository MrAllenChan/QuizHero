/**
 * The component Button is to render "Back to slides" button on quiz page.
 */

import React from 'react';
import { Button } from 'antd';

/**
 * BackButton class is to render "Back to slides" button on quiz page
 */
class BackButton extends React.Component{
    constructor(props) {
        super(props);
        // this.toSlidesCallback = props.toSlidesCallback;

    }

    /**
     * When click the button, execute toSlidesCallback function
     *
     */
    OnClick =()=> {
        this.props.toSlidesCallback();
    }

    /**
     * render the button
     * @returns {*}
     */
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