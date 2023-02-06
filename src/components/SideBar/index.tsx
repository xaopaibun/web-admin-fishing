import React, { useEffect, useState } from 'react';
import type { SubMenuType } from 'rc-menu/lib/interface';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  EditFilled,
  ReadOutlined,
  BarChartOutlined,
  BellOutlined,
  // CommentOutlined,
  // NotificationOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import Loading, { loadingRef } from 'components/Loading';
import { routes } from 'navigations/routes';
import { logout } from 'containers/Auth/slice';
import { useAppDispatch } from 'hooks';
import { Wrapper } from './styles';

const { Sider } = Layout;

const SideBar: React.FC = ({ children }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const navigate = useNavigate();

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const items: ItemType[] = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
      onClick: () => navigate(routes.Dashboard.path),
    },
    {
      key: 'sub2',
      icon: <ReadOutlined />,
      label: 'Danh sách loại',
      onClick: () => navigate('/category'),
    },
    {
      key: '2.5',
      icon: <BellOutlined />,
      label: 'Quản lý đơn hàng',
      onClick: () => navigate(routes.OrderPage.path),
    },
    {
      key: '2',
      icon: <EditFilled />,
      label: 'Quản lý Users',
      onClick: () => navigate('/users'),
    },
    {
      key: 'sub4',
      icon: <BarChartOutlined />,
      label: 'Báo cáo doanh thu',
      onClick: () => navigate('/statistic'),
    },
  ];

  useEffect(() => {
    const openKey = items.find((item) =>
      (item as SubMenuType).children?.some(
        (c) => (c as SubMenuType).key === `/${window.location.pathname.split('/')[1]}`
      )
    )?.key as string;
    setOpenKeys(openKey ? [openKey] : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <Sider width={240} className="sider" trigger={null} collapsedWidth={219} collapsible>
        {/* <div className="site-layout-background">
          {true ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggle} />
          )}
        </div> */}
        <div className="wrap-logo">
          <img
            src={
              true
                ? 'https://img.freepik.com/premium-vector/fishing-creative-logo-design-template_74472-381.jpg?w=2000'
                : 'https://img.freepik.com/premium-vector/fishing-creative-logo-design-template_74472-381.jpg?w=2000g'
            }
            className={!true ? 'image-logo' : 'image-logo-large'}
            onClick={() => navigate(routes.Dashboard.path)}
            alt="coffee house"
          />
        </div>
        <Menu
          mode="inline"
          openKeys={openKeys}
          selectedKeys={[`/${window.location.pathname.split('/')[1]}`]}
          onOpenChange={onOpenChange}
          items={items}
        />
        <LogoutOutlined
          style={{
            cursor: 'pointer',
            display: 'block',
            margin: 'auto',
            fontSize: 20,
            color: '#c4c4c4',
          }}
          onClick={() => dispatch(logout())}
        />
      </Sider>
      <Layout>
        <Loading ref={loadingRef} />
        {children}
      </Layout>
    </Wrapper>
  );
};

export default SideBar;
