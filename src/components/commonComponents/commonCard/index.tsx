import React from 'react';
import './index.less';

type CardProps = {
  [propsName: string]: any;
};

const Card: React.FC<CardProps> = (props) => {
  const { children, ...restOptions } = props;
  return (
    <>
      <div className={'common-card'} {...restOptions}>
        {children}
      </div>
    </>
  );
};

export default Card;
