import React, { Component } from "react";
import { Input, Typography, Button, message } from "antd";
import { connect } from "react-redux";
import { updateProfile } from "../../actions";
import "./UserProfile.scss";

const { Title } = Typography;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      touched: false
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const { name, touched } = this.state;
    if (user && !name && !touched) {
      this.setState({
        name: user.name
      });
    }
  }

  onChange = e => {
    const name = e.target.value;
    this.setState({ name, touched: true });
  };

  handleUpdate = async () => {
    const { name, touched } = this.state;
    if (!touched) {
      message.error("Have no change");
    } else if (!name) {
      message.error("Name never null");
    } else {
      const response = await updateProfile({ name });
      if (response) {
        message.success("thanh cong");
      } else message.error("that bai");
    }
  };

  render() {
    const { name } = this.state;
    const { user } = this.props;

    return (
      <div>
        <Title>UserProfile</Title>
        <label>UserName:</label>
        <Input value={name} name="name" onChange={this.onChange} />
        <label>Email:</label>
        <Input value={user.email} />
        <label>Password:</label>
        <Input.Password placeholder="Password" />
        <label>Confirm Password:</label>
        <Input.Password placeholder="Confirm Password" />
        <Button
          type="primary"
          style={{ marginTop: "1em" }}
          onClick={this.handleUpdate}
        >
          Update
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });
export default connect(mapStateToProps, { updateProfile })(UserProfile);
