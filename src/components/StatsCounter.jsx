import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-konva';
import { FONT_COLOR, FONT_SIZE } from './constants';

const fontProps = {
  fontSize: FONT_SIZE,
  fill: FONT_COLOR
};

const StatsCounter = ({
  y, total, births, deaths
}) => (
  <Fragment>
    <Text
      x={10}
      y={y + 10}
      text={`Total: ${total}`}
      {...fontProps}
    />
    <Text
      x={210}
      y={y + 10}
      text={`Births: ${births}`}
      {...fontProps}
    />
    <Text
      x={410}
      y={y + 10}
      text={`Deaths: ${deaths}`}
      {...fontProps}
    />
  </Fragment>
);

StatsCounter.propTypes = {
  y: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  births: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired
};

export default StatsCounter;
