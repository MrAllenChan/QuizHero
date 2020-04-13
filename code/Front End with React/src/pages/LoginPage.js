import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import "../style/loginPageStyle.css";
import logo from "../fig/logo.png";


const mapDispatchToProps = (dispatch) => {
    return {
        load: () => {
            dispatch(getmechanicInfoList(params, panigation, sorter));
        }
        // loadMechanicsWork: () => {
        //     dispatch(mechanicWorkAction({"infotype":"50"}));
        // },
    
    }
};


class LoginPage extends Component{
  onFinish = values => {
    console.log('Received values of form: ', values);
  };

  registerButtonHandler = ()=>{
      window.location = "/register"
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
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input className="login-input" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
      <Form.Item>
        <Form.Item className="remember-me-box" name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <Button type="primary" htmlType="submit" className="register-button" onClick={this.registerButtonHandler}>
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
