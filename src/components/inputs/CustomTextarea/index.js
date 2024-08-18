import React from 'react';
import PropTypes from 'prop-types';
import bem from 'src/utils/bem';
import styles from './index.module.scss';

const b = bem('custom-textarea', styles);

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  isValid: PropTypes.bool,
  isTouched: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputClass: PropTypes.string,
  maxLength: PropTypes.string,
  disabled: PropTypes.bool,
};

const defaultProps = {
  className: '',
  placeholder: '',
  name: null,
  value: null,
  onChange: null,
  error: '',
  isValid: false,
  isTouched: false,
  rows: '',
  inputClass: '',
  maxLength: '',
  disabled: false,
};

function CustomTextarea(props) {
  const {
    name,
    className,
    onChange,
    placeholder,
    value,
    error,
    isValid,
    isTouched,
    rows,
    inputClass,
    maxLength,
    disabled,
  } = props;

  const isInvalid = !isValid && isTouched;

  return (
    <div className={b({ mix: className })}>
      <textarea
        className={b('input', { mix: inputClass, 'red-border': isInvalid })}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        value={value}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
      />
      {!isValid && isTouched && <div className={b('error')}>{error}</div>}
    </div>
  );
}

CustomTextarea.propTypes = propTypes;
CustomTextarea.defaultProps = defaultProps;

export default CustomTextarea;
