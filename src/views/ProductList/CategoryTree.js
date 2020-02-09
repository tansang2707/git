import React from "react";
import { connect } from "react-redux";
import { Tree } from "antd";
import { withRouter } from "react-router-dom";
import { push } from "connected-react-router";

const { TreeNode } = Tree;
class CategoryTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: true
    };
  }

  onSelectHandle = selected => {
    const { doPush } = this.props;
    doPush(`/categories/${selected}`);
  };

  renderTree = node => {
    const that = this;
    const { isSelected } = this.state;
    const { categories, match } = this.props;
    if (categories && !node)
      return categories.map(cat => (
        <TreeNode
          key={cat.slug}
          title={cat.name}
          disabled={cat.slug === match.params.slug ? isSelected : !isSelected}
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
          disabled={cat.slug === match.params.slug ? isSelected : !isSelected}
        >
          {cat.children && cat.children.length > 0
            ? that.renderTree(cat.children)
            : null}
        </TreeNode>
      ));
    return <TreeNode />;
  };

  render() {
    const { match } = this.props;
    return (
      <>
        {/* <Header>Categories</Header> */}
        <Tree
          defaultSelectedKeys={[match.params.slug]}
          onSelect={this.onSelectHandle}
          selectedKeys={[match.params.slug]}
        >
          {this.renderTree()}
        </Tree>
      </>
    );
  }
}

const mapStateToProps = state => ({ categories: state.categories.categories });

export default connect(mapStateToProps, {
  doPush: push
})(withRouter(CategoryTree));
