import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined,MailOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import "../style/loginPageStyle.css";
import logo from "../fig/logo.png";

class RegisterPage extends Component{
  onFinish = values => {
    console.log('Received values of form: ', values);
  };

  ButtonHandler = ()=>{
    window.location = "/login"
}

  render(){
  return (
    <div className="login-page-container">
    <img src={logo} className="App-logo" alt="logo" />
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input className="login-input" prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input className="login-input" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
        className="login-input"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item style={{marginTop:"20%"}}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        <Button type="primary" htmlType="submit" className="register-button" onClick={this.backButtonHandler}>
          Back
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);