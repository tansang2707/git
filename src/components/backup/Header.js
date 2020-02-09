import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut, toggleCategories } from '../actions';
import { Dropdown, Icon } from 'semantic-ui-react';
import MiniCart from './MiniCart';
import MenuCategories from './Banner/MenuCategories';

const renderAuth = props => {
  if (props.isSignedIn) {
    return (
      <React.Fragment>
        <Dropdown
          className="item"
          text={
            props.user ? (
              `Hello, ${props.user.name}!`
            ) : (
              <div className="ui active inline mini loader"></div>
            )
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/users">
              <i className="icon coffee"></i> User Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => props.signOut()}>
              <i className="icon shutdown"></i> Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Link className="item" to="/auth/signin">
        Sign In
      </Link>
      <Link className="item" to="/auth/signup">
        Sign Up
      </Link>
    </React.Fragment>
  );
};

const Header = props => {
  const [showMinicart, setshowMinicart] = useState(false);
  return (
    <header
      className="ui menu fixed borderless"
      style={{ border: 'none', borderRadius: 'none' }}
    >
      <div className="ui container">
        <div className="header item logo">
          <Link className="text teal" to="/">
            S H O P I N E
          </Link>
        </div>
        <MenuCategories />
        <Link className="item" to="/">
          About
        </Link>
        <div className="ui right floated item">
          {renderAuth(props)}
          <a onClick={() => props.toggleCategories(true)} className="item">
            <i className="icon cart"></i> Cart{' '}
            <div className="ui teal label">0</div>
          </a>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => {
  return { ...state.auth, visible: state.categories.visible };
};

export default connect(
  mapStateToProps,
  { signOut, toggleCategories }
)(Header);
