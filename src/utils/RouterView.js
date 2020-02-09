import React from 'react';
import _ from 'lodash';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

class RouterView extends React.Component {
  UNSAFE_componentWillMount = () => {
    window.scrollTo(0, 0);
    nprogress.start();
  };

  componentDidMount = () => {
    nprogress.done();
  };

  render() {
    const { component: Component } = this.props;
    return (
      <Route
        {..._.omit(this.props, ['component'])}
        exact
        render={props =>
          (this.props.isPrivate && this.props.isSignedIn) ||
          !this.props.isPrivate ? (
            <Component {...props} />
          ) : (
            <Redirect to="/auth/signin" />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });

export default connect(mapStateToProps)(RouterView);
