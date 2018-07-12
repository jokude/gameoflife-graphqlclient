import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Group } from 'react-konva';
import { CELL_SIZE } from './constants';
import StatsCounter from './StatsCounter';

const BOARD_SIZE = 40;

const BOARD_WIDTH = CELL_SIZE * BOARD_SIZE;
const BOARD_HEIGHT = CELL_SIZE * BOARD_SIZE;
const COUNTER_WIDTH = BOARD_WIDTH;
const COUNTER_HEIGHT = 30;

const LIVE_COLOR = '#D32F2F';
const DEAD_COLOR = '#FFCDD2';
const BORDER_COLOR = 'white';
const BORDER_WIDTH = 4;

class Board extends Component {
  componentDidMount() {
    const { updates } = this.props;
    updates();
  }

  render() {
    const {
      grid, total, births, deaths
    } = this.props;
    return (
      <Layer>
        {
          grid.map((row, rowIndex) => row.map((live, columnIndex) => (
            <Rect
              x={rowIndex * CELL_SIZE}
              y={columnIndex * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill={live ? LIVE_COLOR : DEAD_COLOR}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />
          )))
        }
        <Group
          y={BOARD_HEIGHT}
          width={COUNTER_WIDTH}
          height={COUNTER_HEIGHT}
        >
          <StatsCounter total={total} births={births} deaths={deaths} />
        </Group>
      </Layer>
    );
  }
}

Board.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  total: PropTypes.number.isRequired,
  births: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
  updates: PropTypes.func.isRequired
};

export default Board;
