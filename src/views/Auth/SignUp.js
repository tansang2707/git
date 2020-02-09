import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import validator from "validator";
import { Redirect, Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, message, Result } from "antd";
import nprogress from "nprogress";
import Recaptcha from "react-grecaptcha";
import { push } from "connected-react-router";
import { signUp } from "../../modules/auth";
import svgSuccess from "../../assets/img/password_success.svg";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      captcha: false
    };
  }

  renderInput = ({ input, label, meta, type, placeholder }) => {
    let styled = {};
    if (meta.touched && meta.error) {
      styled = { validateStatus: "error", help: meta.error };
    } else if (meta.touched) {
      styled = { validateStatus: "success" };
    }
    return (
      <>
        <Form.Item label={label} hasFeedback {...styled}>
          {type === "password" ? (
            <Input.Password allowClear {...input} placeholder={placeholder} />
          ) : (
            <Input {...input} placeholder={placeholder} />
          )}
        </Form.Item>
      </>
    );
  };

  onRecaptcha = verifyToken => {
    this.setState({ captcha: true });
    console.log(verifyToken);
  };

  onFormSubmit = async formData => {
    const { dosignUp } = this.props;
    const { captcha } = this.state;
    nprogress.start();
    if (!captcha) {
      window.grecaptcha.reset();
      message.info("Please check recaptcha first");
      throw new SubmissionError({ name: "Please enter recaptcha" });
    }
    const register = await dosignUp(formData);
    if (!register.error) this.setState({ complete: true });
    // const e = { name: "hello" };
    // throw new SubmissionError(e);
    nprogress.done();
  };

  render() {
    const { isSignedIn, handleSubmit, doPush } = this.props;
    const { complete } = this.state;
    if (isSignedIn) return <Redirect to="/" />;
    if (!complete)
      return (
        <div className="container m2t">
          <h2 className="text-center">
            <span className="textHeading">
              <b>Member</b> Sign Up
            </span>
          </h2>

          <Row type="flex" justify="center">
            <Col xs={24} lg={8}>
              <Form onSubmit={handleSubmit(this.onFormSubmit)}>
                <Field
                  type="text"
                  label="What's your name ?"
                  name="name"
                  component={this.renderInput}
                  placeholder="Enter your name"
                />
                <Field
                  type="text"
                  label="Email"
                  name="email"
                  component={this.renderInput}
                  placeholder="Enter your email"
                />
                <Field
                  type="password"
                  label="Password"
                  name="password"
                  component={this.renderInput}
                  placeholder="Enter your password"
                />
                <Field
                  type="password"
                  label="Retype your password"
                  name="passwordConfirm"
                  component={this.renderInput}
                  placeholder="Retype your password"
                />
                <Form.Item className="text-center">
                  <Recaptcha
                    sitekey="6LfQQMwUAAAAAB__0sPsjJeXzAQSTHi4egiUdxac"
                    callback={this.onRecaptcha}
                  />
                </Form.Item>
                <Row>
                  <Col span={12}>
                    <Button type="primary" htmlType="submit">
                      Sign Up
                    </Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Link to="/auth/signin">Need to sign in ?</Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      );
    return (
      <div className="container m2t">
        <Result
          icon={
            <img
              src={svgSuccess}
              style={{ maxWidth: "300px" }}
              alt="Register Success"
            />
          }
          title="Sign up successfully!"
          subTitle="Thank for joining with us, have a nice day!"
          extra={[
            <Button onClick={() => doPush("/")} type="primary">
              Let&apos;s Shopping
            </Button>
          ]}
        />
      </div>
    );
  }
}

const validate = formData => {
  const errs = {};

  const requiredField = ["email", "name", "password", "passwordConfirm"];

  requiredField.map(field => {
    if (!formData[field]) {
      errs[field] = "Please enter the field above";
    }
    return field;
  });

  if (formData.email && !validator.isEmail(formData.email)) {
    errs.email = "Please enter correct format";
  }

  if (formData.password && formData.password.length < 8)
    errs.password = `Minimum character is 8 | Your pasword: ${formData.password.length}`;

  if (formData.password !== formData.passwordConfirm) {
    errs.passwordConfirm = "Please enter correct password";
  }

  return errs;
};

const form = reduxForm({
  form: "signupForm",
  validate
})(SignUp);

const mapStateToProps = state => ({ ...state.auth });

export default connect(mapStateToProps, { dosignUp: signUp, doPush: push })(
  form
);
