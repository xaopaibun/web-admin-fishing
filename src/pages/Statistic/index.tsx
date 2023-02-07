import { FC, useEffect, useState } from 'react';

import HeaderDashboard from 'components/Header';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Col, DatePicker, DatePickerProps, List, Row, Statistic } from 'antd';
import { orderService } from 'services';
import { DataStatistic } from 'types';
import { loadingRef } from 'components/Loading';
import StatisticStyled from './styles';

const StatisticPage: FC = () => {
  const [yearSelect, setYearSelect] = useState<string | number>(2023);
  const [dataStatistic, setDataStatistic] = useState<{
    statistic_month: Array<DataStatistic>;
    statistic_year: Array<DataStatistic>;

    statistic_product: Array<{ _id: string; totalQuantity: number }>;
  }>({} as { statistic_month: []; statistic_year: []; statistic_product: [] });

  const [loading, setLoading] = useState<boolean>(false);

  const options = {
    chart: {
      type: 'areaspline',
    },
    xAxis: {
      categories: dataStatistic.statistic_month
        ?.map((value) => value._id.month)
        ?.map((value) => `Tháng ${value}`),
    },
    title: {
      text: `Biểu đồ thể hiện doanh thu từng tháng trong năm ${yearSelect}`,
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
        data: dataStatistic.statistic_month?.map((value) => value.total_revenue),
      },
    ],
  };

  // const optionsTwo = {
  //   chart: {
  //     type: 'pie',
  //   },
  //   xAxis: {
  //     categories: dataStatistic.statistic_product?.map((value) => value._id),
  //   },
  //   title: {
  //     text: `Top 5 sản phẩm bán chạy trong năm ${yearSelect}`,
  //   },
  //   yAxis: {
  //     title: {
  //       text: 'sản phẩm',
  //     },
  //   },
  //   series: [
  //     {
  //       name: 'Doanh thu (VND)',
  //       allowPointSelect: true,
  //       data: dataStatistic.statistic_product?.map((value) => value.totalQuantity),
  //     },
  //   ],
  // };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setYearSelect(dateString);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await orderService.statisticOrderByYear(yearSelect);
        setDataStatistic(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [yearSelect]);

  useEffect(() => {
    loadingRef.current?.isLoading(loading);
  }, [loading]);

  return (
    <StatisticStyled>
      <HeaderDashboard title="Báo cáo thống kê doanh thu" className="header" />
      <div className="container">
        <Row gutter={16}>
          {dataStatistic.statistic_year?.map((value) => (
            <Col span={6}>
              <Card>
                <Statistic
                  title={`Tổng doanh thu năm ${value._id.year} (VND)`}
                  value={value.total_revenue}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <div className="mr-50"></div>
        <div className="form-search">
          <DatePicker onChange={onChange} picker="year" />
        </div>
        <div className="mr-50"></div>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <div className="mr-50"></div>
        <Card>
          <List
            size="large"
            header={
              <div style={{ fontSize: 26, fontWeight: 'bold' }}>
                Top 5 sản phẩm bán chạy nhất năm {yearSelect}
              </div>
            }
            bordered
            dataSource={dataStatistic?.statistic_product}
            renderItem={(item, i) => (
              <List.Item key={i}>
                <span style={{ fontSize: 16, fontWeight: 'bold' }}> 0{i + 1}</span> {'  '}
                {item._id}
              </List.Item>
            )}
          />
        </Card>
      </div>
    </StatisticStyled>
  );
};

export default StatisticPage;
