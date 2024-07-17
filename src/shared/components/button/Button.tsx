import React from 'react';

type TButtonProps<T = void> = {
  onClick?: () => T;
  onEventClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  type?: 'submit' | 'button';
  classNames?: string;
  disabled?: boolean;
};

export const Button: React.FunctionComponent<TButtonProps> = ({
  onClick,
  onEventClick,
  text,
  classNames,
  type = 'button',
  disabled = false,
}) => {
  const className = `btn ${classNames}`;
  const onClickFunc = onClick || onEventClick;
  return (
    <button
      type={type}
      className={className}
      onClick={onClickFunc}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
