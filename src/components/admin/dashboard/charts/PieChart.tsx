// * basic
import { useMemo, useRef, useState, useEffect } from 'react';
//  * install libraries
import _ from 'lodash';
import CustomChartLayout from '../../../common/CustomChart';
import moment from 'moment';
import { CHART_COLORS } from '../../../../constants/constant';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// * recoil state
// * components
// * constants

const PieChartLayout = (props: any) => {
  const { originData } = props;
  // * Pie Ref
  const pieRef: any = useRef(null);
  // * Pie Data
  const [data, setData]: any = useState({
    labels: ['근무', '외근', '원격 근무', '출장'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: (d: any) => {
          return '#ffffff';
        },
      },
    ],
  });

  // * pie Options
  const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          pointStyle: 'circle',
          usePointStyle: true,
        },
      },
      tooltip: {
        display: true,
        backgroundColor: '#ffffff',
        borderColor: '#E5E7EB',
        titleColor: '#4B5563',
        bodyColor: '#4B5563',
        borderWidth: 1,
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        callbacks: {
          title: (context: any) => {
            return context[0].label;
          },
          label: (context: any) => {
            return ' ' + context.label + ' : ' + context.formattedValue;
          },
        },
      },
      colors: {
        enabled: false,
        forceOverride: false,
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (value !== 0) {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data: any) => {
              sum += data;
            });
            let percentage = Math.round((value * 100) / sum) + '%';
            return percentage;
          } else {
            let percentage = '';
            return percentage;
          }
        },
        color: '#ffffff',
      },
    },
  };

  useEffect(() => {
    // labels 정의
    const formLabels = _.map(originData, (_data: any) => {
      return _data?.title;
    });

    // 폼 생성
    let form: any = {
      labels: formLabels,
      datasets: [
        {
          data: [],
          backgroundColor: _.map(formLabels, (label: any, index: number) => {
            return CHART_COLORS[index];
          }),
        },
      ],
    };

    // 폼에 데이터 추가하기
    _.map(originData, (data: any) => {
      if (data === 0) {
        return;
      }
      // dataset 순회하며 데이터및 색상 추가
      _.map(form.datasets, (dataset: any, index: any) => {
        // 데이터 추가
        dataset.data.push(data?.commutes_count);
      });
    });
    setData(form);
  }, [originData]);

  // * pie Chart (불필요한 렌더링 금지 - UseMemo)
  const pie = useMemo(() => {
    return (
      <CustomChartLayout
        ref={pieRef}
        type={'pie'}
        data={data}
        options={pieOptions}
        plugins={[ChartDataLabels]}
        className={'flex min-h-[100px] justify-center'}
        width={'35vh'}
        height={'35vh'}
      />
    );
  }, [pieRef, data]);

  return <div className='flex '>{pie}</div>;
};

export default PieChartLayout;
