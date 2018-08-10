import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import {
  CELL_SIZE, CELL_LIVE_COLOR, CELL_EMPTY_COLOR, CELL_BORDER_COLOR, CELL_BORDER_SIZE
} from './constants';

const Grid = ({ grid }) => (
  <Fragment>
    {
      grid.map((row, rowIndex) => row.map((live, columnIndex) => (
        <Rect
          key={`cell-${rowIndex}-${columnIndex}`}
          x={rowIndex * CELL_SIZE}
          y={columnIndex * CELL_SIZE}
          width={CELL_SIZE}
          height={CELL_SIZE}
          fill={live ? CELL_LIVE_COLOR : CELL_EMPTY_COLOR}
          stroke={CELL_BORDER_COLOR}
          strokeWidth={CELL_BORDER_SIZE}
        />
      )))
  }
  </Fragment>

);

Grid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired
};

export default Grid;
