import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import { Form, Input, Row, Col, Button, Result, message } from "antd";
import nprogress from "nprogress";
import { push } from "connected-react-router";

import { resetPassword } from "../../modules/auth";
import successSvg from "../../assets/img/password_success.svg";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { success: false };
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

  onFormSubmit = async formValues => {
    const { match, doPush } = this.props;
    const { token } = match.params;
    nprogress.start();
    const { status } = await resetPassword(token, formValues);
    nprogress.done();
    if (status) {
      return this.setState({ success: true });
    }
    message.error("Token is expired, please try again!");
    return doPush("/auth/forgot-password");
  };

  render() {
    const { isSignedIn, handleSubmit, doPush } = this.props;
    const { success } = this.state;
    if (success)
      return (
        <div className="container m2t">
          <Result
            icon={
              <img
                src={successSvg}
                style={{ maxWidth: "300px" }}
                alt="Success Recover Password"
              />
            }
            title="Your password have been updated"
            subTitle="You can follow actions below to continue"
            extra={[
              <Button type="primary" onClick={() => doPush("/auth/signin")}>
                Login
              </Button>,
              <Button onClick={() => doPush("/")}>Home</Button>
            ]}
          />
        </div>
      );
    if (!isSignedIn)
      return (
        <div className="container m2t">
          <Form onSubmit={handleSubmit(this.onFormSubmit)}>
            <h2 className="text-center">
              <span className="textHeading">
                <b>Member</b>
                <br />
                Reset Password
              </span>
            </h2>
            <Row type="flex" justify="center">
              <Col xs={24} lg={10}>
                <Field
                  name="password"
                  component={this.renderInput}
                  label="Password"
                  type="password"
                  placeholder="Enter your new password"
                />
                <Field
                  name="passwordConfirm"
                  type="password"
                  component={this.renderInput}
                  label="Confirm Password"
                  placeholder="Confirm your new password"
                />
                <div className="text-center">
                  <Button type="primary" htmlType="submit">
                    Start Reset Password
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      );
    return <Redirect to="/" />;
  }
}

const validate = formData => {
  const errs = {};

  if (!formData.password) {
    errs.password = "Password is required";
  }

  if (formData.password !== formData.passwordConfirm) {
    errs.passwordConfirm = "ConfirmPassword incorrect";
  }
  return errs;
};

const mapStateToProps = state => ({ ...state.auth });

const ResetPasswordForm = reduxForm({
  form: "resetPasswordForm",
  validate
})(ResetPassword);

export default connect(mapStateToProps, { doPush: push })(ResetPasswordForm);
