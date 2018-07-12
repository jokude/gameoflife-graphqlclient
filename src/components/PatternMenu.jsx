import React from 'react';
import PropTypes from 'prop-types';
import { Layer } from 'react-konva';
import Mutation from './Mutation';
import { CELL_SIZE } from './constants';

const BOARD_SIZE = 40;

const BOARD_WIDTH = CELL_SIZE * BOARD_SIZE;

const PatternMenu = () => (
  <Layer x={BOARD_WIDTH + 20} height={200}>
    <Mutation x={0} y={20} cells={[[true, false], [true, true], [false, true]]} />
    <Mutation x={0} y={100} cells={[[true, false], [true, true], [true, false]]} />
    <Mutation x={0} y={180} cells={[[false, true], [true, true], [true, false]]} />
    <Mutation x={0} y={260} cells={[[true, true], [true, true]]} />
    <Mutation x={0} y={340} cells={[[true, false], [true, false], [true, false], [true, false]]} />
  </Layer>
);

export default PatternMenu;
