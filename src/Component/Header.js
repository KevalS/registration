import React, { Component } from 'react';
import './component.css'
import { Label, Container, Col } from 'reactstrap';

const Header = ({ text, ...restProps }) => {
        return (
            <Container>
                <Col md={12} className="header-main">
                    <Label className="header-text">{text}</Label>
                </Col>
            </Container>
        );
    }

export default Header;
