import {
  LogoVkProps,
} from './LogoVk.props';

const LogoVk = ({
  className,
}: LogoVkProps): JSX.Element => (
  <svg
    width="48"
    height="48"
    fill="none"
    viewBox="0 0 48 48"
    className={className}
  >
    <path
      fill="#07F"
      d="M0 23.04C0 12.179 0 6.748 3.374 3.374 6.748 0 12.18 0 23.04 0h1.92c10.861 0 16.292 0 19.666 3.374C48 6.748 48 12.18 48 23.04v1.92c0 10.861 0 16.292-3.374 19.666C41.252 48 35.82 48 24.96 48h-1.92c-10.861 0-16.292 0-19.666-3.374C0 41.252 0 35.82 0 24.96v-1.92z"
    />
    <path
      fill="#fff"
      d="M25.54 34.58c-10.94 0-17.18-7.5-17.44-19.98h5.48c.18 9.16 4.22 13.04 7.42 13.84V14.6h5.16v7.9c3.16-.34 6.48-3.94 7.6-7.9h5.16c-.86 4.88-4.46 8.48-7.02 9.96 2.56 1.2 6.66 4.34 8.22 10.02h-5.68c-1.22-3.8-4.26-6.74-8.28-7.14v7.14h-.62z"
    />
  </svg>
);

export default LogoVk;
