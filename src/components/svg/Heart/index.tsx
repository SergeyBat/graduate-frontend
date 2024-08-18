import {
  HeartProps,
} from './Heart.props';

const Heart = ({
  className,
  fill,
}: HeartProps): JSX.Element => (
  <svg
    className={className}
    fill="none"
    overflow="hidden"
    viewBox="0 0 33 33"
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M16.503 3.841c3.488-4.86 10.464-4.86 13.953-1.389C40.746 12.695 16.503 30 16.503 30S-7.746 12.695 2.544 2.452c3.488-3.472 10.47-3.472 13.959 1.39z"
      clipRule="evenodd"
    />
    {' '}

  </svg>
);

export default Heart;
