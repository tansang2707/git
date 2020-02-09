import React from 'react';
import { Icon, Dropdown, Placeholder } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions';
import { Link } from 'react-router-dom';
class MenuCategory extends React.Component {
  componentWillMount = () => {
    if (!this.props.categories) this.props.fetchCategories();
  };

  renderCategories = () => {
    if (this.props.categories)
      return this.props.categories.map(({ name, slug, _id }) => (
        <Dropdown.Item key={_id} as={Link} to={`/categories/${slug}`}>
          {name}
        </Dropdown.Item>
      ));
    return (
      <Dropdown.Item>
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Dropdown.Item>
    );
  };

  render() {
    return (
      <Dropdown
        item
        text={
          <React.Fragment>
            <Icon name="bars" /> Categories
          </React.Fragment>
        }
        className="categoryBox"
      >
        <Dropdown.Menu>
          <React.Fragment>{this.renderCategories()}</React.Fragment>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.categories };
};

export default connect(
  mapStateToProps,
  { fetchCategories }
)(MenuCategory);
