import React, { Component } from "react";
import { Form, Input, Button, Checkbox,message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { userLoginAction } from "../store/actions/loginActions";
import "../style/loginPageStyle.css";
import logo from "../fig/logo.png";
import axios from "axios";
import {BASE_URL} from "../config/config"

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, instructorId) => {
      dispatch(userLoginAction(username, instructorId));
    },
    // loadMechanicsWork: () => {
    //     dispatch(mechanicWorkAction({"infotype":"50"}));
    // },
  };
};



class LoginPage extends Component {
  formRef = React.createRef();

  componentWillReceiveProps(nextProps){
    //invoke function with updated store
    //this.foo(nextProps)
    console.log(this.props); // prevProps
    console.log(nextProps); // currentProps after updating the store
    }

  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  handleSubmit = () => {
      let email = this.props.form.getFieldValue('email')?this.props.form.getFieldValue('email'):null
      let password = this.props.form.getFieldValue('password')?this.props.form.getFieldValue('password'):null
      console.log(email)
      console.log(password)

      if(email === null || password === null){
        message.error("All fields must be filled")
        return;
      }

      let params = {
          email:email,
          pswd : password
      }

      axios.post(BASE_URL+"/login",{},{params}).then(res=>{
          console.log(res.status)
          if(res.status === "201"){
            this.props.login(res.data.name, res.data.instructorId);

          }
      }).catch(err=>{
          console.log(err)
      })
    
  };

  registerButtonHandler = () => {
    window.location = "/register";
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="login-page-container">
        <img src={logo} className="App-logo" alt="logo" />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          ref={this.formRef}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              className="login-input"
              prefix={<UserOutlined className="site-form-item-icon" />}
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
          <Form.Item>
            <Form.Item
              className="remember-me-box"
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="login-form-button"
              onClick={this.handleSubmit}
            >
              Log in
            </Button>
            <Button
              type="primary"
              className="register-button"
              onClick={this.registerButtonHandler}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

 export default Form.create({ name: "LoginPage" })(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
