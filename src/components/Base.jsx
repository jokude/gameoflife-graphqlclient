import React from 'react';
import { Stage } from 'react-konva';
import { CELL_SIZE, BOARD_SIZE } from './constants';
import Board from './Board';
import PatternMenu from './PatternMenu';

const BOARD_WIDTH = CELL_SIZE * BOARD_SIZE;
const BOARD_HEIGHT = CELL_SIZE * BOARD_SIZE;
const COUNTER_HEIGHT = 30;

const Base = () => (
  <Stage
    width={BOARD_WIDTH + 120}
    height={BOARD_HEIGHT + COUNTER_HEIGHT}
  >
    <Board />
    <PatternMenu />
  </Stage>
);

export default Base;
