import _ from 'lodash';
import { JiranFullLogoIcon } from './JiranIcon';
import { useState } from 'react';

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface Props {
  width?: string; // 사이드바 Width
  color?: string; // 사이드바 전체 색상 변경
  padding?: string; // 사이드바 전체 패딩
  icon?: any; // 아이콘 재정의
  headerTemplate?: any; // 헤더 템플릿
  items: any; // content 아이템
  setItems: any; // content 아이템 Set
  setSelectItem?: any; // 선택 아이템 set
}
const SideBarLayout = ({
  width = 'w-[250px]',
  color = 'bg-gray-100',
  padding = 'p-4 py-8',
  icon = <JiranFullLogoIcon w={10} h={10} />,
  headerTemplate = <></>,
  items,
  setItems,
  setSelectItem,
  ...props
}: Props) => {
  // * ContentTemplate Open
  const handleCollapseClick = (item: any) => {
    setItems((prevs: any) => {
      return _.map(prevs, (prev: any) => {
        return prev.label === item.label ? { ...prev, open: !prev.open } : prev;
      });
    });
  };

  // * 선택 아이템 변경
  const handleSelectItem = (item: any) => {
    setSelectItem(item);
  };

  return (
    <div className={`flex flex-col ${width} min-w-[250px] h-full gap-5 ${padding} ${color}`}>
      {/* 상단 제목 */}
      <div className='flex w-full items-center justify-center'>{icon}</div>

      {/* Header */}
      <div className='flex w-full border-b-[1px] border-gray-200'>{headerTemplate}</div>

      {/* Content */}
      <div className='flex w-full felx h-auto overflow-y-auto scrollYWrap'>
        <List className='w-full' component='nav' disablePadding>
          {_.map(items, (item: any, index: number) => {
            return (
              <>
                <ListItemButton
                  // TODO label이 겹치치 않는다는 생각으로 만듦 수정필요
                  onClick={() => {
                    if (_.isEmpty(item?.items)) {
                      handleSelectItem(item);
                    } else {
                      handleCollapseClick(item);
                    }
                  }}
                  key={index}
                >
                  {/* TODO 아이콘 영역이 크기만큼 차치하도록(text 공간 확보용) */}
                  <ListItemIcon style={{ minWidth: '33px' }}>
                    {/* TODO 아이콘은 필수라고 생각하였으나 필수가 아니라면 예외처리 필요 */}
                    <item.icon />
                  </ListItemIcon>
                  {/* TODO text overflow 처리필요 */}
                  <ListItemText primary={item?.label} />
                  {/* 화살표 아이콘 */}
                  {_.isEmpty(item?.items) ? <></> : item.open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {/* 하위항목 */}
                {item?.open ? (
                  <Collapse in={item?.open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {_.map(item?.items, (lastItem: any, lastIndex: number) => {
                        return (
                          <ListItemButton
                            sx={{ pl: 4 }}
                            key={lastIndex}
                            onClick={() => handleSelectItem(lastItem)}
                          >
                            <ListItemIcon style={{ minWidth: '33px' }}>
                              <lastItem.icon />
                            </ListItemIcon>
                            <ListItemText primary={lastItem?.label} />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default SideBarLayout;
