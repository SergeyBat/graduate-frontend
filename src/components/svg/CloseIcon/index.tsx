import {
  CloseIconProps,
} from './CloseIcon.props';

const CloseIcon = ({
  className,
  fill,
  width,
  height,
  stroke,
}: CloseIconProps): JSX.Element => (
  <svg
    className={className}
    width={width || '25'}
    height={height || '25'}
    version="1.1"
  >
    <g
      fill={fill || '#FFFFFF'}
      fillOpacity="1"
      stroke={stroke || '#FFFFFF'}
      strokeLinecap="round"
      strokeMiterlimit="4"
      strokeOpacity="1"
      strokeWidth="3.232"
      transform="translate(3.966 3.568)"
    >
      <path d="M0-.001l17.435 18.213" opacity="1" />
      <path d="M0 18.212L17.435 0" opacity="1" />
    </g>
  </svg>
);

export default CloseIcon;
