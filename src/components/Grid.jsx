import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import { CELL_SIZE, GRID_NAME } from './constants';
import {
  CELL_LIVE_COLOR, CELL_EMPTY_COLOR, CELL_BORDER_COLOR, CELL_BORDER_SIZE
} from './styles';

const Grid = ({ grid }) => (
  <Group name={GRID_NAME}>
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
  </Group>

);

Grid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired
};

export default Grid;
