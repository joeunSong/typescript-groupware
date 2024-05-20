// * basic
import { useMemo, useRef, useState, useEffect } from 'react';
//  * install libraries
import _ from 'lodash';
import CustomChartLayout from '../../../common/CustomChart';
import moment from 'moment';
// * recoil state
// * components
// * constants

const DonutChartLayout = (props: any) => {
  const { storage } = props;
  // * Donghunt Ref
  const donutRef: any = useRef(null);
  // * Donghunt Origin Data
  const [donutData, setDonutData]: any = useState({
    labels: ['오피스웨이브', '잔여', '초과'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: (d: any) => {
          if (d.parsed > 0) {
            // return ChartColor[_.findIndex(ChartColor, ['name', donutData.labels[d.dataIndex]])].color;
          }
          return '#ffffff';
        },
      },
    ],
  });
  // * Donghunt Legend Status
  const [visibleDataset, setVisibleDataset] = useState([true, true, true]);

  // * Donghunt Lengend Click - Data Hidden
  const handleDataVisible = (index: number) => {
    // 범례 상태 변경
    setVisibleDataset((prev: any) => {
      return prev.map((data: any, i: number) => {
        if (i === index) {
          return !data;
        }
        return data;
      });
    });
    // chart 변경
    const chart = donutRef.current.getChart();
    chart.toggleDataVisibility(index);
    chart.update();
  };

  // * Donghunt Options
  const donghnutOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'right',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          pointStyle: 'circle',
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: '#E5E7EB',
        titleColor: '#4B5563',
        bodyColor: '#4B5563',
        borderWidth: 1,
        usePointStyle: true,
        callbacks: {
          // 툴팁 라벨 변경
          // label: (context: any) => {
          //   context.formattedValue = ' ' + byteString(context.parsed);
          // },
        },
      },
      colors: {
        enabled: false,
        forceOverride: false,
      },
    },
  };

  // * useEffect - Donghunt Data Change
  useEffect(() => {
    setDonutData((prev: any) => {
      // 사용량 초과
      if (_.toInteger(storage.total_size) - _.toInteger(storage.storage_usage) < 0) {
        return {
          ...prev,
          datasets: [
            {
              ...prev.datasets[0],
              data: [_.toInteger(storage.storage_usage), -1, _.toInteger(storage.storage_usage) - _.toInteger(storage.total_size)],
            },
          ],
        };
      }

      return {
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: [_.toInteger(storage.storage_usage), _.toInteger(storage.total_size) - _.toInteger(storage.storage_usage), -1],
          },
        ],
      };
    });
  }, [storage]);

  // * Donghunt Chart (불필요한 렌더링 금지 - UseMemo)
  const Donghunt = useMemo(() => {
    return (
      <CustomChartLayout
        ref={donutRef}
        type={'doughnut'}
        data={donutData}
        options={donghnutOptions}
        className={'flex min-h-[100px] justify-center'}
        width={'15vh'}
        height={'15vh'}
      />
    );
  }, [donutRef, donutData]);

  return (
    <div className='flex justify-center'>
      {Donghunt}
      <div className='flex flex-col flex-none justify-center gap-2 pl-10 '>
        {donutData.datasets[0].data.map((data: any, index: number) => {
          return (
            data >= 0 && (
              <div
                className={`flex gap-2 hover:cursor-pointer ${visibleDataset[index] ? '' : 'line-through'} `}
                key={index}
                onClick={() => {
                  handleDataVisible(index);
                }}
              >
                <div
                  className={`flex self-center justify-center w-3 h-3 rounded-full `}
                  // style={{ backgroundColor: ChartColor[_.findIndex(ChartColor, ['name', donutData.labels[index]])].color }}
                />
                <div className={`flex-grow`}>{donutData.labels[index]}</div>
                <div className={`w-20 flex justify-center items-center bg-gray-200 rounded-full`}>
                  {/* <div className='text-sm text-center'>{byteString(data)}</div> */}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default DonutChartLayout;
