import React, { Component } from 'react';
import './main.css'
import Header from '../Component/Header'
import { Container, Row, Col } from 'reactstrap';
import Buttons from '../Component/Buttons';
import InputWithLabel from '../Component/InputWithLabel';
import InputWithOption from '../Component/InputWIthOption';
import { IsValidForm } from '../Common/validation'

class AboutYou extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                name: '',
                role: 'Head Chef',
                resName:'',
                resType:'Regional',
                phone:'',
                address:''
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
    componentDidMount(){
        let { data } = this.state
        let AboutData = JSON.parse(localStorage.getItem('about'))
        if (AboutData) {
            data.name= AboutData.name 
            data.role = AboutData.role
            data.resName =  AboutData.resName 
            data.resType = AboutData.resType 
            data.phone = AboutData.phone 
            data.address = AboutData.address
            this.setState({ data })
        }
    }
    handleSubmit() {
        let { data } = this.state
        let fields = ['name', 'resName', 'phone', 'address']
        let formValidation = IsValidForm(fields, this.state.data)
        this.setState({ errors: formValidation.errors })
        if (formValidation.validate) {
            data = JSON.stringify(data)
            localStorage.setItem('about', data);
            this.props.history.push('/schedule')
        }
        else {
          this.setState({ errorInd: true })
        }
    }
    handleSubmitReturn() {
        this.props.history.push('/')
    }
    render() {
        const { errorInd, errors } = this.state
        let { resType, role, name, address , phone, resName } = this.state.data
        return (
            <Container fluid>
                <Row className="main">
                    <Header text="About You" />
                    <Col md={12} className="inner-padding">
                        <div className="display-inline">
                            <Col md={6} className="inline-content width50">
                                <InputWithLabel text="YOUR NAME" onChange={this.handleChange.bind(this, 'name')} value={name} />
                                {errorInd && <p className="hasError">
                                    {errors.name}
                                    </p>}
                            </Col>
                            <Col md={6} className="inline-content width50">
                                <InputWithOption text="YOUR ROLE" Option={['Head Chef', 'Chef', 'Junior Chef']} onChange={this.handleChange.bind(this, 'role')} value={role} />
                            </Col>
                        </div>
                        <div className="display-inline">
                            <Col md={6} className="inline-content width50">
                                <InputWithLabel text="RESTAURENT NAME" onChange={this.handleChange.bind(this, 'resName')} value={resName} />
                                {errorInd && <p className="hasError">
                                    {errors.resName}
                                    </p>}
                            </Col>
                            <Col md={6} className="inline-content width50">
                                <InputWithOption text="RESTAURENT TYPE" Option={['Regional', 'Regional', 'Regional']} onChange={this.handleChange.bind(this, 'resType')} value={resType} />
                            </Col>
                        </div>
                        <Col md={12} className="inline-content">
                            <InputWithLabel text="PHONE NUMBER" type="number" onChange={this.handleChange.bind(this, 'phone')} value={phone} />
                            {errorInd && <p className="hasError">
                                    {errors.phone}
                                    </p>}
                        </Col>
                        <Col md={12} className="inline-content">
                            <InputWithLabel text="COMPANY ADDRESS" onChange={this.handleChange.bind(this, 'address')} value={address}/>
                            {errorInd && <p className="hasError">
                                    {errors.address}
                                    </p>}
                        </Col>
                        <Col md={12}>
                            <Row className="display-inline inline-content">
                                <div className="button-main-left">
                                    <Buttons outline={true} onPress={this.handleSubmitReturn.bind(this)}>PREVIOUS</Buttons>
                                </div>
                                <div className="button-main-right">
                                    <Buttons onPress={this.handleSubmit.bind(this)}>
                                        2 of 5
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

export default AboutYou;
