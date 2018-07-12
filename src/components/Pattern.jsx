import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import { CELL_SIZE } from './constants';

class Pattern extends Component {
  constructor(props) {
    super(props);
    this.some = null;
  }

  render() {
    const {
      pattern, getRef, rectStyle, ...props
    } = this.props;
    return (
      <Group
        ref={ref => getRef(ref)}
        {...props}
      >
        {pattern.map((row, rowIndex) => row.map((active, columnIndex) => (
          active ? (
            <Rect
              x={rowIndex * CELL_SIZE}
              y={columnIndex * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              {...rectStyle}
            />
          ) : null
        )))}
      </Group>
    );
  }
}


Pattern.propTypes = {
  pattern: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  getRef: PropTypes.func.isRequired,
  rectStyle: PropTypes.shape({})
};

Pattern.defaultProps = {
  rectStyle: null
};

export default Pattern;
