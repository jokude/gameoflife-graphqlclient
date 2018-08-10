import React from 'react';
import PropTypes from 'prop-types';
import { FastLayer } from 'react-konva';
import withBoardQuery from '../hocs/withBoardQuery';
import { CELL_SIZE, BOARD_SIZE, GRID_NAME } from './constants';
import Grid from './Grid';

import StatsCounter from './StatsCounter';

const BOARD_HEIGHT = CELL_SIZE * BOARD_SIZE;

const Board = ({
  grid, total, births, deaths
}) => (
  <FastLayer name={GRID_NAME}>
    <Grid grid={grid} />
    <StatsCounter y={BOARD_HEIGHT} total={total} births={births} deaths={deaths} />
  </FastLayer>
);

Board.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
  total: PropTypes.number,
  births: PropTypes.number,
  deaths: PropTypes.number
};

Board.defaultProps = {
  grid: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(false)),
  total: 0,
  births: 0,
  deaths: 0
};

export default withBoardQuery(Board);
