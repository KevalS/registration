import React, { Component } from 'react';
import './main.css'
import Header from '../Component/Header'
import { Container, Row, Col } from 'reactstrap';
import Buttons from '../Component/Buttons';
import InputWithLabel from '../Component/InputWithLabel';
import { IsValidForm } from '../Common/validation'

class Registration extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      errorInd: false,
      errors: {},
      errorMsg: '',
      errorMsgEmail:''
    }
  }
  handleChange(key, event) {
    const { user } = this.state
    user[key] = event.target.value
    this.setState({ user, errorInd: false, errorMsg:'', errorMsg:'' })
  }
  componentDidMount(){
    let { user } = this.state
    let preEmail =  JSON.parse(localStorage.getItem('loginData'))
    if (preEmail) {
      console.log(preEmail.email)
      user.email = preEmail.email
      user.password = preEmail.password
      user.confirmPassword = preEmail.confirmPassword
      this.setState({user})
    }
  }
  handleSubmit() {
    let { user } = this.state
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      let { confirmPassword, password } = this.state.user
      if (confirmPassword === password) {
        let fields = ['email', 'password', 'confirmPassword']
        let formValidation = IsValidForm(fields, this.state.user)
        this.setState({ errors: formValidation.errors })
        if (formValidation.validate) {
          if (reg.test(user.email) == false) {
            this.setState({ errorMsgEmail: 'Invalid Email Address' })
          }
          else {
          user = JSON.stringify(user)
          localStorage.setItem('loginData', user);

          this.props.history.push('/aboutYou')
          }
        }
        else {
          this.setState({ errorInd: true })
        }
      } else {
        this.setState({ errorMsg: 'Password did not match' })
      }
  }
  render() {
    const { errorInd, errors, errorMsg, errorMsgEmail } = this.state
    const { user } = this.state
    return (
      <Container fluid>
        <Row className="main">
          <Header text="Registration" />
          <Col className="inner-padding">
            <InputWithLabel text="EMAIL" value={user.email} onChange={this.handleChange.bind(this, 'email')} />
            {errorInd && <p className="hasError">
              {errors.email}
            </p>}
            {errorMsgEmail && <p className="hasError">
              {errorMsgEmail}
            </p>}
            <InputWithLabel text="PASSWORD" value={user.password} type="password" onChange={this.handleChange.bind(this, 'password')} />
            {errorInd && <p className="hasError">
              {errors.password}
            </p>}
            <InputWithLabel text="CONFIRM PASSWORD"  value={user.confirmPassword} type="password" onChange={this.handleChange.bind(this, 'confirmPassword')} />
            {errorMsg && <p className="hasError">
              {errorMsg}
            </p>}
            <div className="button-main">
              <Buttons onPress={this.handleSubmit.bind(this)}>
                1 of 5
              </Buttons>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Registration;
