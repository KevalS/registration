import React, { Component } from 'react';
import './main.css'
import Header from '../Component/Header'
import { Container, Row, Col } from 'reactstrap';
import Buttons from '../Component/Buttons';
import InputWithLabel from '../Component/InputWithLabel';
import InputWithOption from '../Component/InputWIthOption';
import { IsValidForm } from '../Common/validation'

class Accounting extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                payment: '',
                terms: '',
                accountEmail:'',
                finantialName:'',
                branch:'',
                accNo:'',
                transferNo:''
            },
            errorInd: false,
            errors: {},
          }
    }
    handleChange(key, event) {
        const { data } = this.state
        data[key] = event.target.value
        this.setState({ data, errorInd:false })
    }
    handleSubmit() {
        let fields = ['accountEmail','branch','accNo','transferNo']
        let formValidation = IsValidForm(fields, this.state.data)
        this.setState({ errors: formValidation.errors })
        if (formValidation.validate) {
            this.props.history.push('/final')
        }
        else {
          this.setState({ errorInd: true })
        }
    }
    handleSubmitReturn() {
        this.props.history.push('/schedule')
    }
    render() {
        const { errorInd, errors } = this.state
        return (
            <Container fluid>
                <Row className="main">
                    <Header text="Accounting Setup" />
                    <Col md={12} className="inner-padding">
                        <div className="display-inline">
                            <Col md={6} className="inline-content width50">
                                <InputWithOption text="PAYMENT METHOD" Option={['EFT', 'EFT', 'EFT']} onChange={this.handleChange.bind(this, 'payment')} />
                            </Col>
                            <Col md={6} className="inline-content width50">
                                <InputWithOption text="REQUESTED TERMS" Option={['NET 14', 'NET 14', 'NET 14']} onChange={this.handleChange.bind(this, 'terms')} />
                            </Col>
                        </div>
                        <Col md={12} className="inline-content">
                            <InputWithLabel text="ACCOUNTING EMAIL" onChange={this.handleChange.bind(this, 'accountEmail')} />
                            {errorInd && <p className="hasError">
                                    {errors.accountEmail}
                                    </p>}
                        </Col>
                        <Col md={12} className="inline-content">
                            <InputWithOption text="FINANTIAL INSTRUCTION NAME" Option={['BANK', 'BANK', 'BANK']} onChange={this.handleChange.bind(this, 'finantialName')} />
                        </Col>
                        <Col md={12} className="inline-content">
                            <InputWithLabel text="BANK BRANCH ADDRESS" onChange={this.handleChange.bind(this, 'branch')} />
                            {errorInd && <p className="hasError">
                                    {errors.branch}
                                    </p>}
                        </Col>
                        <div className="display-inline">
                            <Col md={6} className="inline-content width50">
                                <InputWithLabel text="ACCOUNT NUMBER" type="number"  onChange={this.handleChange.bind(this, 'accNo')} />
                                {errorInd && <p className="hasError">
                                    {errors.accNo}
                                    </p>}
                            </Col>
                            <Col md={6} className="inline-content width50">
                                <InputWithLabel text="TRANSIT NUMBER" type="number" onChange={this.handleChange.bind(this, 'transferNo')} />
                                {errorInd && <p className="hasError">
                                    {errors.transferNo}
                                    </p>}
                            </Col>
                        </div>
                        <Col md={12}>
                            <Row className="display-inline inline-content">
                                <div className="button-main-left">
                                    <Buttons outline={true} onPress={this.handleSubmitReturn.bind(this)}>PREVIOUS</Buttons>
                                </div>
                                <div className="button-main-right">
                                    <Buttons onPress={this.handleSubmit.bind(this)}>
                                        4 of 5
                                    </Buttons>
                                </div>
                            </Row>
                        </Col>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Accounting;
