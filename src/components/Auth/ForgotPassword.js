import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { forgotPassword } from "../../actions";
import { Redirect } from "react-router-dom";
import { message } from "antd";
import {
  Container,
  Header,
  Label,
  Segment,
  Grid,
  Button
} from "semantic-ui-react";
import nprogress from "nprogress";

class ForgotPassword extends React.Component {
  state = {
    message: false
  };
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
    nprogress.start();
    const { status } = await forgotPassword(formValues);
    nprogress.done();
    if (status === true) {
      return message.success("Reset Password Email Have Been Sent");
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
                <b>Member</b> Forgot Password
              </Header.Content>
            </Header>
            {this.renderError()}
            <Grid centered columns={2}>
              <Grid.Column>
                <Segment stacked>
                  <Field
                    name="email"
                    component={this.renderInput}
                    label="Email"
                  />
                  <Button basic color="red">
                    Forgot password
                  </Button>
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

export default connect(mapStateToProps)(ForgotPasswordForm);
