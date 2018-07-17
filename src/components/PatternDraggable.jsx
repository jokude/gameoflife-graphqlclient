import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { CELL_SIZE, GRID_NAME } from './constants';
import {
  CELL_LIVE_COLOR, CELL_BORDER_SIZE, PATTERN_BORDER_COLOR, TRANSPARENT_COLOR
} from './styles';
import Pattern from './Pattern';

const snapAxisValue = axisValue => Math.round(axisValue / CELL_SIZE) * CELL_SIZE;

class PatternDraggable extends Component {
  constructor(props) {
    super(props);
    this.pattern = null;
    this.shadowPattern = null;
    this.stage = null;
    this.container = null;

    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    this.stage = this.pattern.getStage();
    this.container = this.stage.container();
    this.pattern.moveToTop();
  }

  onMouseEnter() {
    this.container.style.cursor = 'pointer';
  }

  onMouseLeave() {
    this.container.style.cursor = 'default';
  }

  getGridPosition() {
    const position = this.pattern.getAbsolutePosition();
    return this.pattern.getChildren().map((cell) => {
      const x = (position.x + cell.x()) / CELL_SIZE;
      const y = (position.y + cell.y()) / CELL_SIZE;
      return (x * 40) + y;
    });
  }

  setPatternDraggingStyle() {
    this.shadowPattern.children.toArray().forEach((cell) => {
      cell.fill(TRANSPARENT_COLOR);
    });
  }

  snapToGrid(element) {
    element.position({
      x: snapAxisValue(this.pattern.x()),
      y: snapAxisValue(this.pattern.y())
    });
  }

  patternIsOverGrid() {
    const {
      x, y, width, height
    } = this.shadowPattern.getClientRect();
    const grid = this.stage.findOne(`.${GRID_NAME}`).getClientRect();

    return x >= 0 && x + width <= grid.width && y >= 0 && y + height <= grid.height;
  }

  dragStart() {
    this.setPatternDraggingStyle();
    this.shadowPattern.moveToTop();
    this.pattern.moveToTop();
  }

  dragEnd() {
    const { put } = this.props;

    this.snapToGrid(this.pattern);
    if (this.patternIsOverGrid()) {
      put(this.getGridPosition());
    }

    this.stage.batchDraw();
    this.shadowPattern.position({ x: 0, y: 0 });
    this.pattern.position({ x: 0, y: 0 });
  }

  dragMove() {
    this.snapToGrid(this.shadowPattern);
    this.stage.batchDraw();
  }

  render() {
    const { y, cells } = this.props;
    return (
      <Group
        y={y}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <Pattern
          opacity={0}
          pattern={cells}
          getRef={(ref) => { this.pattern = ref; }}
          draggable
          onDragstart={this.dragStart}
          onDragend={this.dragEnd}
          onDragmove={this.dragMove}
        />
        <Pattern
          pattern={cells}
          getRef={(ref) => { this.shadowPattern = ref; }}
          rectStyle={{
            fill: CELL_LIVE_COLOR,
            stroke: PATTERN_BORDER_COLOR,
            strokeWidth: CELL_BORDER_SIZE
          }}
        />
      </Group>
    );
  }
}

PatternDraggable.propTypes = {
  y: PropTypes.number.isRequired,
  cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  put: PropTypes.func.isRequired
};

export default PatternDraggable;
