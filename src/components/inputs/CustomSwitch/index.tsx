import bem from '@utils/bem';
import { useEffect } from 'react';
import { CustomSwitchProps } from './CustomSwitch.props';
import styles from './index.module.scss';

const b = bem('switch', styles);

const CustomSwitch = ({
  firstText,
  secondText,
  activeTab,
  toggleActiveTab,
  values,
  buttonClassName,
  wrapperClassName,
}: CustomSwitchProps) => {
  const {
    valueFirst,
    valueSecond,
  } = values;

  useEffect(() => {
    if (!activeTab) {
      toggleActiveTab(valueFirst);
    }
  }, [activeTab, toggleActiveTab, valueFirst]);

  return (
    <div
      className={b('', { mix: wrapperClassName })}
    >
      <button
        type="button"
        className={b(
          'switch-left',
          { mix: buttonClassName, activeTab: activeTab === valueFirst },
        )}
        onClick={() => toggleActiveTab(valueFirst)}
      >
        {firstText}
      </button>
      <button
        type="button"
        className={b(
          'switch-right',
          { mix: buttonClassName, activeTab: activeTab === valueSecond },
        )}
        onClick={() => toggleActiveTab(valueSecond)}
      >
        {secondText}
      </button>
      {' '}

    </div>
  );
};

export default CustomSwitch;
