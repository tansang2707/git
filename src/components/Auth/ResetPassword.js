import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { resetPassword } from "../../actions";
import { Redirect } from "react-router-dom";
import {
  Container,
  Header,
  Label,
  Segment,
  Grid,
  Button
} from "semantic-ui-react";
import nprogress from "nprogress";
import { message } from "antd";

class ResetPassword extends React.Component {
  renderInputError = meta => {
    if (meta.touched && meta.error)
      return (
        <Label pointing prompt>
          {meta.error}
        </Label>
      );
    return null;
  };

  renderInput = ({ input, label, meta, type }) => {
    const className = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type={type} autoComplete="off" />
        {this.renderInputError(meta)}
      </div>
    );
  };

  renderError = () => {
    if (this.props.err)
      return (
        <div className="ui negative message">
          <i className="close icon"></i>
          <div className="header">Error</div>
          <p>
            <i className="icon warning"></i> {this.props.err.message}
          </p>
        </div>
      );
  };

  onFormSubmit = async formValues => {
    const { token } = this.props.match.params;
    nprogress.start();
    const { status } = await resetPassword(token, formValues);
    nprogress.done();
    if (status) {
      return message.success("Password Reset Successfully");
    }
    return message.error("This is an error message");
  };

  render() {
    if (!this.props.isSignedIn)
      return (
        <Container>
          <form
            className="ui form"
            onSubmit={this.props.handleSubmit(this.onFormSubmit)}
          >
            <Header as="h2" textAlign="center">
              <Header.Content className="textHeading">
                <b>Member</b> Reset Password
              </Header.Content>
            </Header>
            {this.renderError()}
            <Grid centered columns={2}>
              <Grid.Column>
                <Segment stacked>
                  <Field
                    name="password"
                    component={this.renderInput}
                    label="Password"
                  />
                  <Field
                    name="passwordConfirm"
                    type="password"
                    component={this.renderInput}
                    label="Confirm Password"
                  />
                  <Button color="teal">Reset</Button>
                </Segment>
              </Grid.Column>
            </Grid>
          </form>
        </Container>
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

export default connect(mapStateToProps)(ResetPasswordForm);
