// * basic
import React from 'react';
// * install libraries
import _ from 'lodash';

// * image
// * svg
import JiranFullLogo from '../../assets/svg/JiranFullLogo.svg';

const render = (
  src: any,
  w: any,
  h: any,
  width: any | undefined = null,
  height: any | undefined = null,
  className: any,
  onClick: any | undefined = null,
) => {
  return (
    <img
      alt={''}
      src={src}
      // className={`w-${w && h ? w : '5'} h-${w && h ? h : '5'} ${className !== undefined ? className : ''}`}
      width={!_.isEmpty(width) && width !== undefined ? width : 200}
      height={!_.isEmpty(height) && height !== undefined ? height : 200}
      onClick={() => {
        if (onClick !== null) {
          onClick();
        }
      }}
    />
  );
};

// icon
export const JiranFullLogoIcon = (props: any) =>
  render(
    JiranFullLogo,
    props.w,
    props.h,
    props.width,
    props.height,
    props.className,
    props.onClick,
  );
