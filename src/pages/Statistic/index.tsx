import { FC } from 'react';

import HeaderDashboard from 'components/Header';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import StatisticStyled from './styles';

const StatisticPage: FC = () => {
  const options = {
    chart: {
      type: 'line',
    },
    xAxis: {
      categories: Array.from({ length: 12 }).map((value, i) => `Tháng ${i + 1}`),
    },
    title: {
      text: 'Doanh thu shop năm 2022',
    },
    yAxis: {
      title: {
        text: 'VND',
      },
    },
    series: [
      {
        name: 'Doanh thu (VND)',
        allowPointSelect: true,
        data: [
          8005000, 4050000, 2420000, 7500000, 1230000, 5350000, 4356000, 5300000, 13000000, 8700000,
          9830000, 4500000,
        ],
      },
    ],
  };
  return (
    <StatisticStyled>
      <HeaderDashboard title="Báo cáo thống kê doanh thu" className="header" />
      <div className="container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </StatisticStyled>
  );
};

export default StatisticPage;
