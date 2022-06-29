import React from 'react';
import './_gauge.less';
import PropTypes from 'prop-types';

const Gauge = (props) => {
  const { radius, percent = 0, fillColor, backgroundColor, font } = props;
  const strokeWidth = radius * 0.2;
  const innerRadius = radius - strokeWidth / 2;

  const circumference = innerRadius * 2 * Math.PI;
  const arc = circumference * (270 / 360);
  const dashArray = `${arc} ${circumference}`;
  const transform = `rotate(135, ${radius}, ${radius})`;
  //const percentNormalized = Math.min(Math.max(percent, 0), 100);
  const offset = arc - (percent / 100) * arc;

  return (
    <svg height={radius * 2} width={radius * 2} className='gauge_base'>
      ‍
      <g>
        <circle
          cx={radius}
          cy={radius}
          fill='transparent'
          r={innerRadius}
          stroke={backgroundColor}
          strokeDasharray={dashArray}
          strokeWidth={strokeWidth - 2}
          transform={transform}
        />
        ‍
        <circle
          cx={radius}
          cy={radius}
          fill='transparent'
          r={innerRadius}
          stroke={fillColor}
          strokeDasharray={dashArray}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth - 2}
          style={{
            transition: 'stroke-dashoffset 0.3s',
          }}
          transform={transform}
        />
        <text
          x='50%'
          y='50%'
          dominantBaseline='middle'
          textAnchor='middle'
          className='percentage'
          fontSize={font}
        >
          {percent}
          <tspan className='percentage-symbol'>%</tspan>
        </text>
        ‍
      </g>
    </svg>
  );
};

Gauge.propTypes = {
  radius: PropTypes.number,
  percent: PropTypes.number,
  fillColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  font: PropTypes.string,
};

export default Gauge;
