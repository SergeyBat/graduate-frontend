import React from 'react';
import { IconXProps } from './IconX.props';

function IconX({
  width = '13',
  height = '13',
  fill = '#123C55',
  className = '',
}: IconXProps) {
  return (
    <svg className={className} width={width} height={height} viewBox="3 3 12 12">
      <g fill={fill} fillRule="evenodd" transform="rotate(-45 11.121 3.879)">
        <rect width="1.091" height="12" x="5.455" rx="0.545" />
        <path d="M12 6a.545.545 0 0 1-.545.545H.545a.545.545 0 1 1 0-1.09h10.91c.3 0 .545.244.545.545z" />
      </g>
    </svg>
  );
}

export default IconX;
