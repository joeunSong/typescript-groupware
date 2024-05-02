import _ from 'lodash';
import { JiranFullLogoIcon } from '../JiranIcon';
import { useState } from 'react';

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface Props {
  width?: string; // 사이드바 Width
  color?: string; // 사이드바 전체 색상 변경
  padding?: string; // 사이드바 전체 패딩
}
const SideBarLayout = ({ width = '', color = '', padding = '', ...props }: Props) => {
  const [items, setItems] = useState([
    { icon: SendIcon, label: 'test1', open: false, items: [] },
    { icon: DraftsIcon, label: 'test2', open: false, items: [] },
    {
      icon: InboxIcon,
      label: 'test3',
      open: true,
      items: [{ icon: DraftsIcon, label: 'test3밑에' }],
    },
  ]);

  const handleCollapseClick = (item: any) => {
    setItems((prevs: any) => {
      return _.map(prevs, (prev: any) => {
        return prev.label === item.label ? { ...prev, open: !prev.open } : prev;
      });
    });
  };

  return (
    <div
      className={`flex flex-col h-full gap-5  ${_.isEmpty(width) ? 'w-[250px]' : width} ${_.isEmpty(color) ? 'bg-gray-100' : color} ${_.isEmpty(padding) ? 'p-4 py-8' : padding}`}
    >
      {/* 상단 제목 */}
      <div className='flex w-full items-center justify-center'>
        <JiranFullLogoIcon w={10} h={10} />
      </div>
      {/* Header */}
      <div className='flex w-full border-b-[1px] border-gray-200'></div>
      {/* Content */}
      <div className='flex w-full felx h-auto overflow-y-auto scrollYWrap'>
        <List className='w-full' component='nav' disablePadding>
          {_.map(items, (item: any, index: number) => {
            return (
              <>
                <ListItemButton
                  // TODO label이 겹치치 않는다는 생각으로 만듦 수정필요
                  onClick={() => (_.isEmpty(item?.items) ? null : handleCollapseClick(item))}
                >
                  {/* TODO 아이콘 영역이 크기만큼 차치하도록(text 공간 확보용) */}
                  <ListItemIcon>
                    {/* TODO 아이콘은 필수라고 생각하였으나 필수가 아니라면 예외처리 필요 */}
                    <item.icon />
                  </ListItemIcon>
                  {/* TODO text overflow 처리 */}
                  <ListItemText primary={item?.label} />
                  {/* 화살표 아이콘 */}
                  {_.isEmpty(item?.items) ? <></> : item.open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {/* 하위항목 */}
                {item?.open ? (
                  <Collapse in={item?.open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {_.map(item?.items, (lastItem: any) => {
                        return (
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
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
