import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { Redirect } from "react-router-dom";
import { Form, Input, Row, Col, Button, Result } from "antd";
import nprogress from "nprogress";
import { push } from "connected-react-router";
import { forgotPassword } from "../../modules/auth";
import resetVector from "../../assets/img/reset_password.svg";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: false };
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
    nprogress.start();
    const response = await forgotPassword(formValues);
    const { status } = response;

    nprogress.done();
    if (status) {
      return this.setState({ message: true });
    }
    throw new SubmissionError({ email: response.message });
  };

  render() {
    const { isSignedIn, handleSubmit } = this.props;
    const { message } = this.state;
    if (message)
      return (
        <div className="container m2t">
          <Result
            icon={
              <img
                style={{ maxWidth: "300px" }}
                src={resetVector}
                alt="reset password"
              />
            }
            status="success"
            title="RESETTING PASSWORD MAIL HAVE BEEN SENT"
            subTitle="Check your email and follow the instruction to reset your password"
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
                <br /> Forgot Password
              </span>
            </h2>
            <Row type="flex" justify="center" className="m2t">
              <Col xs={24} lg={10}>
                <Field
                  name="email"
                  component={this.renderInput}
                  placeholder="Enter your recovery Email"
                />
                <div className="text-center">
                  <Button type="primary" htmlType="submit">
                    Forgot password
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

  if (!formData.email) {
    errs.email = "Email is required";
  }
  return errs;
};

const mapStateToProps = state => ({ ...state.auth });

const ForgotPasswordForm = reduxForm({
  form: "forgotPasswordForm",
  validate
})(ForgotPassword);

export default connect(mapStateToProps, { doPush: push })(ForgotPasswordForm);
