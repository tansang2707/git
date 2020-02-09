import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validator from 'validator';
import { signUp } from '../../actions';
import { Redirect, Link } from 'react-router-dom';
import {
  Container,
  Header,
  Grid,
  Segment,
  Label,
  Button
} from 'semantic-ui-react';
import nprogress from 'nprogress';

class SignUp extends React.Component {
  state = {
    complete: false
  };

  renderInputError = meta => {
    if (meta.touched && meta.error) {
      return (
        <Label prompt pointing>
          {meta.error}
        </Label>
      );
    }
  };

  renderInput = ({ input, label, meta, type }) => {
    const className = `field ${
      meta.touched && meta.error ? 'error' : 'success'
    }`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input type={type} {...input} />
        {this.renderInputError(meta)}
      </div>
    );
  };

  submitHandler = async formData => {
    nprogress.start();
    const register = await this.props.signUp(formData);
    if (!register.error) this.setState({ complete: true });
    nprogress.done();
  };

  render() {
    if (this.props.isSignedIn) return <Redirect to="/" />;
    if (!this.state.complete)
      return (
        <Container>
          <Header as="h2" textAlign="center">
            <Header.Content className="textHeading">
              <b>Member</b> Sign Up
            </Header.Content>
          </Header>
          <Grid centered columns={2}>
            <Grid.Column>
              <Segment stacked>
                <form
                  className="ui form"
                  onSubmit={this.props.handleSubmit(this.submitHandler)}
                >
                  <Field
                    type="text"
                    label="What's your name ?"
                    name="name"
                    component={this.renderInput}
                  />
                  <Field
                    type="text"
                    label="Email"
                    name="email"
                    component={this.renderInput}
                  />
                  <Field
                    type="password"
                    label="Password"
                    name="password"
                    component={this.renderInput}
                  />
                  <Field
                    type="password"
                    label="Retype your password"
                    name="passwordConfirm"
                    component={this.renderInput}
                  />
                  <Button color="teal">Sign Up</Button>
                  <Button basic as={Link} to="/auth/signin" floated="right">
                    Need to sign in ?
                  </Button>
                </form>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      );
    return (
      <div className="ui message positive">
        <div className="header">Register is complete!</div>
        <p>Thank for joining us. Happy shopping!</p>
        <Link className="ui teal basic button" to="/auth/signin">
          Sign In To Shopping
        </Link>
      </div>
    );
  }
}

const validate = formData => {
  const errs = {};

  const requiredField = ['email', 'name', 'password', 'passwordConfirm'];

  requiredField.map(field => {
    if (!formData[field]) {
      errs[field] = 'Please enter the field above';
    }
    return field;
  });

  if (formData.email && !validator.isEmail(formData.email)) {
    errs.email = 'Please enter correct format';
  }

  if (formData.password && formData.password.length < 8)
    errs.password =
      'Minimum character is 8 | Your pasword: ' + formData.password.length;

  if (formData.password !== formData.passwordConfirm) {
    errs.passwordConfirm = 'Please enter correct password';
  }

  return errs;
};

const form = reduxForm({
  form: 'signupForm',
  validate
})(SignUp);

const mapStateToProps = state => ({ ...state.auth });

export default connect(
  mapStateToProps,
  { signUp }
)(form);
