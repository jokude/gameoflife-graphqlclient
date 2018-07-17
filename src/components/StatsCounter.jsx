import React from 'react';
import PropTypes from 'prop-types';
import { Group, Text } from 'react-konva';
import { FONT_COLOR, FONT_SIZE } from './styles';

const fontProps = {
  fontSize: FONT_SIZE,
  fill: FONT_COLOR
};

const StatsCounter = ({
  y, total, births, deaths
}) => (
  <Group y={y}>
    <Text
      x={10}
      y={10}
      text={`Total: ${total}`}
      {...fontProps}
    />
    <Text
      x={210}
      y={10}
      text={`Births: ${births}`}
      {...fontProps}
    />
    <Text
      x={410}
      y={10}
      text={`Deaths: ${deaths}`}
      {...fontProps}
    />
  </Group>
);

StatsCounter.propTypes = {
  y: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  births: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired
};

export default StatsCounter;
