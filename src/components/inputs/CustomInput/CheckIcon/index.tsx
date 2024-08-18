import React from 'react';
import { CheckIconProps } from 'src/components/inputs/CustomInput/CheckIcon/CheckIcon.props';

function CheckIcon({
  width = 'none',
  height = '',
  fill = '13',
  className = '10',
  stroke = '#123C55',
}: CheckIconProps) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 13 10">
      <path fill={fill} fillRule="evenodd" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 4.606l3.606 3.606L11.818 1" />
    </svg>
  );
}

export default CheckIcon;
