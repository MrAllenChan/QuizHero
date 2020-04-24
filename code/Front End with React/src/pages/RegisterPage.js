import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import "../style/loginPageStyle.css";
import { BASE_URL } from "../config/config";
import logo from "../fig/logo.png";
import axios from "axios"

const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {};

class RegisterPage extends Component {
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  handleSubmit = (err, values) => {
    let username = this.props.form.getFieldValue('username')?this.props.form.getFieldValue('username'):null
    let email = this.props.form.getFieldValue('email')?this.props.form.getFieldValue('email'):null
    let password = this.props.form.getFieldValue('password')?this.props.form.getFieldValue('password'):null

    if(email === null || password === null || username === null){
      message.error("All fields must be filled")
      return;
    }

    if(email !== '*@*.*'){
      message.error("Please enter email in correct format!")
      return;
    }

    let params = {
      name: username,
      email:email,
      pswd : password
    }

    axios.post(BASE_URL+"/register",params).then(res=>{
        console.log(res.status)
        if(res.status === 201){
          message.loading("Register success, directing you to HomePage",[2],onclose=()=>{
            console.log(res)
            // this.props.login(res.data.name, res.data.instructorId);
            localStorage.setItem("instructorId", res.data.instructorId)
            localStorage.setItem("username", res.data.name)
            localStorage.setItem("isLogin", 1)
            window.location = "/HomePage"
          });

        }
    }).catch(err=>{
        console.log(err)
        message.error("Account already exists. Please use another email address!")
    })
  }



  backButtonHandler = () => {
    window.location.replace(BASE_URL + "/login");
  };

  render() {
    const { getFieldProps } = this.props.form;

    const validateMessages = {
      required: ` is required!`,
      types: {
        email: ` is not validate email!`
      }
    };

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
          validateMessages={validateMessages}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              className="login-input"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              {...getFieldProps("username")}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: 'email',
                message: "Please use a valid email!"
              },
            ]}
          >
            <Input
              className="login-input"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              {...getFieldProps("email")}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              className="login-input"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              {...getFieldProps("password")}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: "20%" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={this.handleSubmit}
            >
              Register
            </Button>
            <Button
              type="primary"
              className="register-button"
              onClick={this.backButtonHandler}
            >
              Back
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: "LoginPage" })(connect(mapStateToProps, mapDispatchToProps)(RegisterPage))
