import { BAR_CHART_BORDER } from '../../../../constants/constant';
import CustomChartLayout from '../../../common/CustomChart';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';

const BarChartLayout = (props: any) => {
  const { originData, originForm, selectLabel, indexAxis } = props;

  //* Bar ref
  const barRef: any = useRef(null);
  // * data
  const [data, setData] = useState(null);

  // * BarOption
  const barOptions = {
    indexAxis: indexAxis,
    maintainAspectRatio: false,
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
        display: true,
        text: originForm?.title,
        position: 'top',
        color: '#202020',
        font: {
          family: 'Comic Sans MS',
          size: 20,
          weight: 'bold',
          lineHeight: 1.2,
        },
      },
      legend: {
        display: false,
        position: 'top',
        align: 'center',
        labels: {
          boxWidth: 5,
          boxHeight: 5,
          padding: 24,
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
            if (selectLabel === 'weekly') {
              return [
                moment(originData?.[context[0].dataIndex].start_at).format('YYYY-MM-DD'),
                '~' + moment(originData?.[context[0].dataIndex].end_at).format('YYYY-MM-DD'),
              ];
            }
            return context[0].label;
          },
          label: (context: any) => {
            return ' ' + context.dataset.label + ' : ' + context.formattedValue;
          },
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
    let form: any = {
      name: [originForm?.label],
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          borderRadius: BAR_CHART_BORDER,
          label: originForm?.label,
        },
      ],
    };

    // 폼에 데이터 추가하기
    _.map(originData, (data: any) => {
      // labels추가
      switch (selectLabel) {
        case 'daily':
          form.labels.push(moment(data.start_at).format('YYYY-MM-DD (dd)'));
          break;
        case 'weekly':
          form.labels.push(moment(data.start_at).format('YYYY-MM-DD'));
          break;
        case 'monthly':
          form.labels.push(moment(data.start_at).format('YYYY-MM'));
          break;
        case 'yearly':
          const _date = moment(data.start_at).format('YYYY') + '년';
          form.labels.push(_date);
          break;
      }

      // dataset 순회하며 데이터및 색상 추가
      _.map(form.datasets, (dataset: any, index: any) => {
        // 데이터 추가
        dataset.data.push(data[originForm?.type]);
        // 색상 추가
        dataset.backgroundColor.push(originForm?.color);
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
        className='flex w-full min-h-[400px] items-center justify-center'
        height={'20vh'}
      />
    );
  }, [barRef, data]);

  return <div className='flex w-full'>{Bar}</div>;
};

export default BarChartLayout;
