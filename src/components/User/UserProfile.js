import React from "react";
import { connect } from "react-redux";
import { Container, Form, Button } from "semantic-ui-react";
import { updateProfile } from "../../actions";
import { message } from "antd";

class UserProfile extends React.Component {
  state = {
    name: null,
    touched: false
  };
  componentDidUpdate() {
    const { user } = this.props;
    const { name, touched } = this.state;
    if (user && !name && !touched) {
      this.setState({ name: user.name });
    }
  }
  handleUpdate = async () => {
    const { name } = this.state;
    const { updateProfile } = this.props;
    const response = await updateProfile({ name });
    if (response) {
      message.success("Successful updated");
    } else message.error("Error updated");
  };
  onChange = e => {
    const name = e.target.value;
    this.setState({ name: name, touched: true });
  };
  render() {
    const { user } = this.props;
    return (
      <Container>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input type="text" readOnly value={(user && user.email) || ""} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input type="password" />
          </Form.Field>
          <Button color="teal" onClick={this.handleUpdate}>
            Update
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, { updateProfile })(UserProfile);
