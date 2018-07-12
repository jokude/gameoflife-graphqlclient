import React from 'react';
import { Stage } from 'react-konva';
import { CELL_SIZE } from './constants';
import Query from './Query';
import PatternMenu from './PatternMenu';

const BOARD_SIZE = 40;
const BOARD_WIDTH = CELL_SIZE * BOARD_SIZE;
const BOARD_HEIGHT = CELL_SIZE * BOARD_SIZE;
const COUNTER_HEIGHT = 30;

const Base = () => (
  <Stage
    width={BOARD_WIDTH + 120}
    height={BOARD_HEIGHT + COUNTER_HEIGHT}
  >
    <Query />
    <PatternMenu />
  </Stage>
);

export default Base;
