import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer } from 'react-konva';
import { CELL_SIZE } from './constants';
import Grid from './Grid';
import StatsCounter from './StatsCounter';

const BOARD_SIZE = 40;
const BOARD_HEIGHT = CELL_SIZE * BOARD_SIZE;

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
        <Grid grid={grid} />
        <StatsCounter y={BOARD_HEIGHT} total={total} births={births} deaths={deaths} />
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
