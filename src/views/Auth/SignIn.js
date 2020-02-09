import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { Redirect, Link } from "react-router-dom";

import { Row, Col, Form, Input, Button } from "antd";

import nprogress from "nprogress";
import { signIn } from "../../modules/auth";

class SignIn extends React.Component {
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

  renderError = () => {
    const { err } = this.props;
    if (err)
      return (
        <div className="ui negative message">
          <i className="close icon" />
          <div className="header">Error</div>
          <p>
            <i className="icon warning" /> {err.message}
          </p>
        </div>
      );
    return <></>;
  };

  onFormSubmit = async formValues => {
    nprogress.start();
    const { dosignIn } = this.props;
    const response = await dosignIn(formValues);
    nprogress.done();
    if (!response.status) throw new SubmissionError(response.err);
  };

  render() {
    const { isSignedIn, handleSubmit } = this.props;
    if (!isSignedIn)
      return (
        <div className="container m2t">
          {/* <form className="ui form" onSubmit={handleSubmit(this.onFormSubmit)}> */}
          <h2 className="text-center">
            <span className="textHeading">
              <b>Member</b> Sign In
            </span>
          </h2>
          <Row type="flex" justify="center">
            <Col xs={24} lg={8}>
              <Form onSubmit={handleSubmit(this.onFormSubmit)}>
                <Field
                  name="email"
                  component={this.renderInput}
                  label="Email"
                  placeholder="Enter your email"
                />
                <Field
                  name="password"
                  type="password"
                  component={this.renderInput}
                  label="Password"
                  placeholder="Enter your password"
                />
                <Form.Item>
                  <Row>
                    <Col span={12} className="text-left">
                      <Button type="primary" htmlType="submit">
                        Sign In
                      </Button>
                    </Col>
                    <Col span={12} className="text-right">
                      <Link to="/auth/forgot-password">Forgot password?</Link>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          {/* </form> */}
        </div>
      );
    return <Redirect to="/" />;
  }
}

const validate = formData => {
  const errs = {};

  if (!formData.email) {
    errs.email = "Email is required";
  }

  if (!formData.password) {
    errs.password = "Password is required";
  }
  return errs;
};

const mapStateToProps = state => ({ ...state.auth });

const SignInForm = reduxForm({
  form: "signInForm",
  validate
})(SignIn);

export default connect(mapStateToProps, { dosignIn: signIn })(SignInForm);
