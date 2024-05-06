import React from 'react';

function TimelineBar() {
  //0-23 시간 배열
  const timeline = Array(24)
    .fill(0)
    .map((v, i) => i);

  return (
    <div className='flex w-full  '>
      <div className='w-[200px]'></div>
      <div className='flex-1 flex w-full justify-between'>
        {timeline.map((_it, idx) => (
          <span key={idx} className='flex-1 text-gray-500'>
            {_it}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TimelineBar;
