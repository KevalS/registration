import React, { Component } from 'react';
import './main.css'
import Header from '../Component/Header'
import { Container, Row, Col } from 'reactstrap';
import Buttons from '../Component/Buttons';
import InputWithLabel from '../Component/InputWithLabel';
import AboutYou from './AboutYou';

class Final extends Component {
    constructor() {
        super()
        this.state={
            data: {
                email1:'',
                email2:'',
                email3:''
              },
        }

    }
    handleChange(key, event) {
        const { data } = this.state
        data[key] = event.target.value
        this.setState({ data, errorInd: false })
    }
    handleSubmit() {
        alert("final")
    }
    handleSubmitReturn() {
        this.props.history.push('/accounting')
    }
    render() {
        return (
            <Container fluid>
                <Row className="main">
                    <Header text="All Done" />
                    <Col md={12} className="inner-padding">
                        <InputWithLabel text="EMAIL #1 (Optional)" onChnage={this.handleChange.bind(this, 'email1')} />
                        <InputWithLabel text="EMAIL #2 (Optional)" onChnage={this.handleChange.bind(this, 'email2')} />
                        <InputWithLabel text="EMAIL #3 (Optional)" onChnage={this.handleChange.bind(this, 'email3')} />
                        <Col md={12}>
                            <Row className="display-inline inline-content">
                                <div className="button-main-left">
                                    <Buttons outline={true} onPress={this.handleSubmitReturn.bind(this)}>PREVIOUS</Buttons>
                                </div>
                                <div className="button-main-right">
                                    <Buttons onPress={this.handleSubmit.bind(this)}>
                                        5 of 5
                        </Buttons>
                                </div>
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Final;
