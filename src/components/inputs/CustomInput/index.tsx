import React from 'react';
import InputMask from 'react-input-mask';
import bem from 'src/utils/bem';
import { CustomInputProps } from '@components/inputs/CustomInput/CustomInput.props';
import styles from './index.module.scss';

const b = bem('custom-input', styles);

const CustomInput = ({
  className = '',
  type = 'text',
  placeholder = '',
  maxLength,
  name = '',
  value = '',
  onChange = () => {},
  error = '',
  isValid = false,
  isTouched = false,
  withMask = false,
  mask = '',
  inputClass = '',
  disabled = false,
  id = 'null',
  withIcon = false,
  backGroundImage = '',
}: CustomInputProps) => {
  const isInvalid = !isValid && isTouched;
  return (
    <div className={b({ mix: className })}>
      {withMask ? (
        <InputMask
          id={id}
          className={b('input', {
            mix: inputClass,
            'red-border': isInvalid,
            'card-icon': withIcon,
          })}
          type={type}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          mask={mask}
          disabled={disabled}
          style={{
            backgroundImage: `url(${withIcon ? backGroundImage : ''})`,
          }}
        />
      ) : (
        <input
          className={b('input', {
            mix: inputClass,
            'red-border': isInvalid,
            'card-icon': withIcon,
          })}
          id={id}
          type={type}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          style={{
            backgroundImage: `url(${withIcon ? backGroundImage : ''})`,
          }}
        />
      )}
      {isInvalid && <div className={b('error')}>{error}</div>}
    </div>
  );
};

export default CustomInput;
