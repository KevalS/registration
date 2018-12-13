import React, { Component } from 'react';
import './component.css'
import { Button } from 'reactstrap';


const Buttons = ({ children,onPress,outline, ...restProps }) => {
    return (
      <div className="btn-con">
        <Button className={outline ==  true ? "btn-outline" :"btn-main"} onClick={onPress}>{children}</Button>
      </div>
    );
  }

export default Buttons;
