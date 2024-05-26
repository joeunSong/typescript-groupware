import { BAR_CHART_BORDER, CHART_COLORS } from '../../../../constants/constant';
import CustomChartLayout from '../../../common/CustomChart';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BarChartLayout = (props: any) => {
  const { originData, departmentLabels, indexAxis } = props;
  //* Bar ref
  const barRef: any = useRef(null);
  // * data
  const [data, setData] = useState(null);

  // * BarOption
  const barOptions = {
    indexAxis: indexAxis,
    maintainAspectRatio: false,
    animation: {},
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          color: (context: any) => {
            return '#f9f9f9';
          },
        },
      },
      y: {
        display: false,
        reverse: indexAxis === 'y' ? true : false,
        border: {
          display: false,
        },
        grid: {
          color: (context: any) => {
            return '#f9f9f9';
          },
        },
        ticks: {
          color: (context: any) => {
            return '#9CA3AF';
          },
        },
      },
    },
    plugins: {
      title: {
        display: false,
        position: 'top',
        color: '#202020',
        font: {
          family: 'Noto Sans KR',
          size: 20,
          weight: 'bold',
          lineHeight: 1.2,
        },
      },
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 15,
          //   boxHeight: 5,
          // padding: 50,
          pointStyle: 'rectRounded',
          usePointStyle: true,
          useBorderRadius: 5,
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
            return ' ' + context.dataset.label + ' : ' + context.formattedValue + 'h';
          },
        },
      },
      datalabels: {
        formatter: (value: any) => {
          return value + 'h';
        },
        font: {
          family: 'Noto Sans KR',
          size: 13,
          // weight: 'bold',
          lineHeight: 0,
        },
      },
      colors: {
        enabled: false,
        forceOverride: false,
      },
    },
  };

  // * 데이터 폼
  useEffect(() => {
    // 5개월 전부터 현재까지의 월을 포함하는 배열 생성
    const months = _.map(Array(5), function (_, i) {
      const month = moment().subtract(i, 'months');
      return month.format('YY.MM');
    }).reverse();

    const datasets = _.map(departmentLabels, (department: any) => {
      return {
        label: department,
        data: [],
        datalabels: {
          align: 'end',
          anchor: 'end',
        },
        backgroundColor: [],
        borderRadius: BAR_CHART_BORDER,
        borderSkipped: false,
      };
    });

    let form: any = {
      name: departmentLabels,
      labels: months,
      datasets: datasets,
    };

    // 폼에 데이터 추가하기
    _.map(originData, (data: any) => {
      // dataset 순회하며 데이터및 색상 추가
      _.map(form.datasets, (dataset: any, index: any) => {
        // 데이터, 색상 추가
        dataset.data.push(data.commutes[index]?.avg_hours);
        dataset.backgroundColor.push(CHART_COLORS[index]);
      });
    });

    setData(form);
  }, [originData]);

  // * Bar Chart (불필요한 렌더링 금지)
  const Bar = useMemo(() => {
    return (
      <CustomChartLayout
        ref={barRef}
        type='bar'
        data={data}
        options={barOptions}
        plugins={[ChartDataLabels]}
        className='w-full h-full '
        // className='flex w-full min-h-[400px] items-center justify-center'
        height={'35vh'}
        width={'100%'}
      />
    );
  }, [barRef, data]);

  return <div className='flex w-full'>{Bar}</div>;
};

export default BarChartLayout;
