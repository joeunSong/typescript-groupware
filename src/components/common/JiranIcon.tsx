// * basic
import React from 'react';
// * install libraries
import _ from 'lodash';

// * image
// * svg
import JiranFullLogo from '../../assets/svg/JiranFullLogo.svg';
import miniOrganization from '../../assets/svg/miniOrganization.svg';
import miniCompany from '../../assets/svg/miniCompany.svg';
import miniFolder from '../../assets/svg/miniFolder.svg';
import miniUserLeader from '../../assets/svg/miniUserLeader.svg';
import miniUser from '../../assets/svg/miniUser.svg';
import reset from '../../assets/svg/reset.svg';
import bottomArrow from '../../assets/svg/bottomArrow.svg';

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
      width={width !== undefined ? width : 200}
      height={height !== undefined ? height : 200}
      onClick={() => {
        if (onClick !== null) {
          onClick();
        }
      }}
    />
  );
};

// icon
export const JiranFullLogoIcon = (props: any) => render(JiranFullLogo, props.w, props.h, props.width, props.height, props.className, props.onClick);
export const MiniOrganizationIcon = (props: any) =>
  render(miniOrganization, props.w, props.h, props.width, props.height, props.className, props.onClick);
export const MiniCompanyIcon = (props: any) => render(miniCompany, props.w, props.h, props.width, props.height, props.className, props.onClick);
export const MiniFolderIcon = (props: any) => render(miniFolder, props.w, props.h, props.width, props.height, props.className, props.onClick);
export const MiniUserLeaderIcon = (props: any) => render(miniUserLeader, props.w, props.h, props.width, props.height, props.className, props.onClick);
export const MiniUserIcon = (props: any) => render(miniUser, props.w, props.h, props.width, props.height, props.className, props.onClick);
export const ResetIcon = (props: any) => render(reset, props.w, props.h, props.width, props.height, props.className, props.onClick);
export const BottomArrowIcon = (props: any) => render(bottomArrow, props.w, props.h, props.width, props.height, props.className, props.onClick);
