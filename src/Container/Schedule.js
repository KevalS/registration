import React, { Component } from 'react';
import './main.css'
import Header from '../Component/Header'
import { Container, Row, Col } from 'reactstrap';
import Buttons from '../Component/Buttons';
import InputWithLabel from '../Component/InputWithLabel';
import InputWithOption from '../Component/InputWIthOption';
import { IsValidForm } from '../Common/validation'

class Schedule extends Component {
    constructor() {
        super()
        this.state = {
            data: {
             deliveriesForm:'10:00 AM',
             deliveriesTo:'10:00 AM',
             instruction:''
            },
            errorInd: false,
            errors: {},
          }
    }
    componentDidMount(){
        let { data } = this.state
        let schedule = JSON.parse(localStorage.getItem('schedule'))
        if (schedule) {
            data.deliveriesForm= schedule.deliveriesForm 
            data.deliveriesTo = schedule.deliveriesTo
            data.instruction =  schedule.instruction 
            this.setState({ data })
        }
    }
    handleChange(key, event) {
        const { data } = this.state
        data[key] = event.target.value
        this.setState({ data, errorInd:false })
    }
    handleSubmit() {
        let { data } = this.state
        let fields = ['instruction']
        let formValidation = IsValidForm(fields, this.state.data)
        this.setState({ errors: formValidation.errors })
        if (formValidation.validate) {
            data = JSON.stringify(data)
            localStorage.setItem('schedule', data)
            this.props.history.push('/accounting')
        }
        else {
          this.setState({ errorInd: true })
        }
    }
    handleSubmitReturn() {
        this.props.history.push('/aboutyou')
    }
    render() {
        const { errorInd, errors } = this.state
        let { deliveriesForm, deliveriesTo, instruction } = this.state.data
        return (
            <Container fluid>
                <Row className="main">
                    <Header text="Delivery Schedule" />
                    <Col md={12} className="inner-padding">
                        <div className="display-inline">
                            <Col md={6} className="inline-content">
                                <InputWithOption text="DELIVERIES FORM" Option={['10:00 AM', '11:00 AM', '12:00 AM']} onChange={this.handleChange.bind(this, 'deliveriesForm')} value={deliveriesForm} />
                            </Col>
                            <Col md={6} className="inline-content">
                                <InputWithOption text="DELIVERIES TO" Option={['10:00 AM', '11:00 AM', '12:00 AM']} onChange={this.handleChange.bind(this, 'deliveriesTo')} value={deliveriesTo} />
                            </Col>
                        </div>
                        <Col md={12} className="inline-content">
                            <InputWithLabel text="SPECIAL INSTRUCTIONS" onChange={this.handleChange.bind(this, 'instruction')} value={instruction} />
                            {errorInd && <p className="hasError">
                                    {errors.instruction}
                                    </p>}
                        </Col>
                        <Col md={12}>
                            <Row className="display-inline inline-content">
                                <div className="button-main-left">
                                    <Buttons outline={true} onPress={this.handleSubmitReturn.bind(this)}>PREVIOUS</Buttons>
                                </div>
                                <div className="button-main-right">
                                    <Buttons onPress={this.handleSubmit.bind(this)} >
                                        3 of 5
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

export default Schedule;
