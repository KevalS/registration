import React, { Component } from 'react';
import './component.css'
import { Input, Label } from 'reactstrap';

const InputWithLabel = ({ text, ...restProps }) => {
        return (
            <div className="labels-main">
                <Label className="labels-text">{text}</Label>
                <Input className="input-main" {...restProps} />
            </div>
        )
    }
export default InputWithLabel;
