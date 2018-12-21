import React, { Component } from 'react';
import './main.css'
import Header from '../Component/Header'
import { Container, Row, Col } from 'reactstrap';
import Buttons from '../Component/Buttons';
import InputWithLabel from '../Component/InputWithLabel';
import  axios  from 'axios'

class Final extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                email1: '',
                email2: '',
                email3: ''
            },
            errorMsgEmail: null,
        }
    }
    componentWillMount() {
        let { data } = this.state
        let final = JSON.parse(localStorage.getItem('final'))
        if (final) {
            data.email1 = final.email1
            data.email2 = final.email2
            data.email3 = final.email3
            this.setState({ data })
        }
    }
    handleChange(key, event) {
        let { data } = this.state
        data[key] = event.target.value
        this.setState({ data, errorInd: false, errorMsgEmail: null })

    }
    handleSubmit() {
        let { data, errorMsgEmail } = this.state
        data = JSON.stringify(data)
        localStorage.setItem('final', data)
        let step1 = JSON.parse(localStorage.getItem('loginData'))
        let step2 = JSON.parse(localStorage.getItem('about'))
        let step3 = JSON.parse(localStorage.getItem('schedule'))
        let step4 = JSON.parse(localStorage.getItem('accounting'))
        let dataTOSend = {
            name: step2.name,
            email: step1.email,
            password: step1.password,
            role: step2.role,
            restaurentName: step2.resName,
            restaurenttype: step2.resType,
            phone: step2.phone,
            companyAddress: step2.address,
            deliveryFrom: step3.deliveriesForm,
            deliveryTo: step3.deliveriesTo,
            sepecialInstruction: step3.instruction,
            paymentMehod: step4.payment,
            requestedTerms: step4.terms,
            accountingEmail: step4.accountEmail,
            finantialName: step4.finantialName,
            bankAddress: step4.branch,
            accountNumber: step4.accNo,
            transitNumber: step4.transferNo,
            email1: data.email1,
            email2: data.email2,
            email3: data.email3
        }
        
        axios.post(`${'http://209.97.142.219:3033/user'}`,{
            ...dataTOSend
        })
        .then(res => {
            console.log(res,"00000")
            alert(res.data)
            return res
        })
        .catch(function (error) {
            console.log(error,"error")
        return error
        })

    }
    handleSubmitReturn() {
        this.props.history.push('/accounting')
    }
    render() {
        let { email1, email2, email3 } = this.state.data
        let { data, errorMsgEmail } = this.state
        return (
            <Container fluid>
                <Row className="main">
                    <Header text="All Done" />
                    <Col md={12} className="inner-padding">
                        <InputWithLabel text="EMAIL #1 (Optional)" onChange={this.handleChange.bind(this, 'email1')} value={email1} />
                        {errorMsgEmail && <p className="hasError">
                            {errorMsgEmail}
                        </p>}
                        <InputWithLabel text="EMAIL #2 (Optional)" onChange={this.handleChange.bind(this, 'email2')} value={email2} />
                        <InputWithLabel text="EMAIL #3 (Optional)" onChange={this.handleChange.bind(this, 'email3')} value={email3} />
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
