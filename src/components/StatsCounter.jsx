import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-konva';

const StatsCounter = ({ total, births, deaths }) => (
  <Fragment>
    <Text
      x={10}
      y={10}
      text={`Total: ${total}`}
      fontSize={20}
      fill="#555"
    />
    <Text
      x={210}
      y={10}
      text={`Births: ${births}`}
      fontSize={20}
      fill="#555"
      align="center"
    />
    <Text
      x={410}
      y={10}
      text={`Deaths: ${deaths}`}
      fontSize={20}
      fill="#555"
      align="center"
    />
  </Fragment>
);

StatsCounter.propTypes = {
  total: PropTypes.number.isRequired,
  births: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired
};

export default StatsCounter;
