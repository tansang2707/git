import React from "react";
import { connect } from "react-redux";
import { Tree } from "antd";
import { Header } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import "./sidebar.scss";

const { TreeNode } = Tree;
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: true
    };
  }

  onSelectHandle = selected => {
    console.log(selected);
    this.props.history.push(`/categories/${selected}`);
  };

  renderTree = node => {
    const that = this;
    const { isSelected } = this.state;
    if (this.props.categories && !node)
      return this.props.categories.map(cat => (
        <TreeNode
          key={cat.slug}
          title={cat.name}
          disabled={
            cat.slug === this.props.match.params.slug ? isSelected : !isSelected
          }
        >
          {cat.children && cat.children.length > 0
            ? that.renderTree(cat.children)
            : null}
        </TreeNode>
      ));

    if (node)
      return node.map(cat => (
        <TreeNode
          key={cat.slug}
          title={cat.name}
          disabled={
            cat.slug === this.props.match.params.slug ? isSelected : !isSelected
          }
        >
          {cat.children && cat.children.length > 0
            ? that.renderTree(cat.children)
            : null}
        </TreeNode>
      ));
  };

  render() {
    return (
      <>
        <Header>Categories</Header>
        <Tree
          defaultSelectedKeys={[this.props.match.params.slug]}
          onSelect={this.onSelectHandle}
          selectedKeys={[this.props.match.params.slug]}
        >
          {this.renderTree()}
        </Tree>
      </>
    );
  }
}

const mapStateToProps = state => ({ categories: state.categories.categories });

export default connect(mapStateToProps)(withRouter(Sidebar));
