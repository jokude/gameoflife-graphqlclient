import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { CELL_SIZE } from './constants';
import Pattern from './Pattern';

const snapAxisValue = axisValue => Math.round(axisValue / CELL_SIZE) * CELL_SIZE;

class PatternDraggable extends Component {
  constructor(props) {
    super(props);
    this.pattern = null;
    this.shadowPattern = null;

    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragMove = this.dragMove.bind(this);
  }

  componentDidMount() {
    this.stage = this.pattern.getStage();
    this.pattern.moveToTop();
  }

  getGridPosition() {
    const pos = this.pattern.getAbsolutePosition();
    return this.pattern.getChildren().map((cell) => {
      const x = (pos.x + cell.x()) / CELL_SIZE;
      const y = (pos.y + cell.y()) / CELL_SIZE;
      return (x * 40) + y;
    });
  }

  snapToGrid(element) {
    element.position({
      x: snapAxisValue(this.pattern.x()),
      y: snapAxisValue(this.pattern.y())
    });
  }

  dragStart() {
    this.shadowPattern.show();
    this.shadowPattern.moveToTop();
    this.pattern.moveToTop();
  }

  dragEnd() {
    const { put, x, y } = this.props;
    this.snapToGrid(this.pattern);
    this.stage.batchDraw();
    this.shadowPattern.hide();
    put(this.getGridPosition());
    this.pattern.position({ x, y });
  }

  dragMove() {
    this.snapToGrid(this.shadowPattern);
    this.stage.batchDraw();
  }

  render() {
    const { x, y, cells } = this.props;
    return (
      <Group x={x} y={y}>
        <Pattern
          pattern={cells}
          getRef={(ref) => { this.pattern = ref; }}
          draggable
          onDragstart={this.dragStart}
          onDragend={this.dragEnd}
          onDragmove={this.dragMove}
          rectStyle={{
            fill: '#fff',
            stroke: '#ddd',
            strokeWidth: 1,
            shadowColor: 'black',
            shadowBlur: 2,
            shadowOffset: { x: 1, y: 1 },
            shadowOpacity: 0.4
          }}
        />
        <Pattern
          pattern={cells}
          getRef={(ref) => { this.shadowPattern = ref; }}
          rectStyle={{
            fill: '#FF7B17',
            opacity: 0.6,
            stroke: '#CF6412',
            strokeWidth: 3,
            dash: [20, 2]
          }}
        />
      </Group>
    );
  }
}

PatternDraggable.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  cells: PropTypes.arrayOf(PropTypes.bool).isRequired,
  put: PropTypes.func.isRequired
};

export default PatternDraggable;
