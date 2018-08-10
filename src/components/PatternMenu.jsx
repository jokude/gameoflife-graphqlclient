import React from 'react';
import { Layer } from 'react-konva';
import PatternDraggable from './PatternDraggable';
import { CELL_SIZE, BOARD_SIZE } from './constants';

const BOARD_WIDTH = CELL_SIZE * BOARD_SIZE;

const PatternMenu = () => (
  <Layer x={BOARD_WIDTH + 20}>
    <PatternDraggable y={20} cells={[[true, false], [true, true], [false, true]]} />
    <PatternDraggable y={100} cells={[[true, false], [true, true], [true, false]]} />
    <PatternDraggable y={180} cells={[[false, true], [true, true], [true, false]]} />
    <PatternDraggable y={260} cells={[[true, true], [true, true]]} />
    <PatternDraggable y={340} cells={[[true, false], [true, false], [true, false], [true, false]]} />
  </Layer>
);

export default PatternMenu;
