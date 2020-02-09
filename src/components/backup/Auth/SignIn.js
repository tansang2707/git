import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../../actions';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Header,
  Label,
  Segment,
  Grid,
  Button
} from 'semantic-ui-react';
import nprogress from 'nprogress';

class SignIn extends React.Component {
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
    const className = `field ${meta.touched && meta.error ? 'error' : ''}`;
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
    await this.props.signIn(formValues);
    nprogress.done();
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
                <b>Member</b> Sign In
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
                  <Field
                    name="password"
                    type="password"
                    component={this.renderInput}
                    label="Password"
                  />
                  <Button color="teal">Login</Button>
                  <Button floated="right" basic color="red">
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
    errs.email = 'Email is required';
  }

  if (!formData.password) {
    errs.password = 'Password is required';
  }
  return errs;
};

const mapStateToProps = state => ({ ...state.auth });

const SignInForm = reduxForm({
  form: 'signInForm',
  validate
})(SignIn);

export default connect(
  mapStateToProps,
  { signIn }
)(SignInForm);
