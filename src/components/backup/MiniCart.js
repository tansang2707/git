import React from 'react';
import { Sidebar, Segment } from 'semantic-ui-react';
const MiniCart = props => {
  console.log(props);
  return (
    <Sidebar
      as={Segment}
      animation="overlay"
      icon="labeled"
      inverted
      onHide={() => props.setVisible(false)}
      vertical
      visible={props.show}
      width="thin"
    >
      Hello
    </Sidebar>
  );
};

export default MiniCart;
