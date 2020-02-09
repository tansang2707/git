import React from 'react';
import { Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import Header from './Header';
import Routes from '../routes';
import { getMe, toggleCategories } from '../actions';
import RouterView from '../utils/RouterView';
import '../scss/style.scss';
import { Container, Sidebar, Menu } from 'semantic-ui-react';
import MiniCart from './MiniCart';

class App extends React.Component {
  componentWillMount = () => {
    this.props.getMe();
  };

  renderRoutes = () => {
    return Routes.map(({ path, component, isPrivate }) => (
      <RouterView
        path={path}
        isPrivate={isPrivate}
        component={component}
        key={path}
      />
    ));
  };

  setVisible = visible => {
    return visible;
  };

  render() {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Sidebar.Pushable>
          <MiniCart
            show={this.props.visible}
            setVisible={this.props.toggleCategories}
          />
          <Sidebar.Pusher dimmed={this.props.visible}>
            <Router history={history}>
              <div className="ui">
                <Header />
                <Switch>{this.renderRoutes()}</Switch>
              </div>
            </Router>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  visible: state.categories.visible
});

export default connect(
  mapStateToProps,
  { getMe, toggleCategories }
)(App);
