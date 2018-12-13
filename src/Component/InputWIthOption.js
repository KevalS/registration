import React, { Component } from 'react';
import './component.css'
import { Input, Label } from 'reactstrap';

const InputWithOption = ({ text, Option, ...restProps }) => {
    return (
        <div className="labels-main">
            <Label className="labels-text">{text}</Label>
            <Input className="input-main" type="select" {...restProps}>
                {Option.map((val, index) => {
                    return (
                            <option key={index}>{val}</option>
                    )
                })} 
               
            </Input>

        </div>
    )
}
export default InputWithOption;
