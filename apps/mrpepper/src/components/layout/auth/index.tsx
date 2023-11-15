import React, { useEffect } from 'react';
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Space,
  Row,
  Col,
  Dropdown,
  Button,
  Input,
  type MenuProps
} from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  LogoutOutlined,
  MenuOutlined,
  UserAddOutlined,
  HomeOutlined
} from '@ant-design/icons';
// import {
//   AppDispatch,
//   RootState,
//   actions,
//   thunks,
// } from '../../../assets/redux/store';
// import AddFriendPopup from '../add-friend-popup';
// import { signOut } from 'firebase/auth';
// import { auth } from '@mr-pepper/firebase';
// import { InitISession } from '../../pages/login/@types';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const { Header, Content, Sider } = Layout;

const AuthLayout: React.FC<{ children: React.ReactNode }> = (props) => {
    const { t } = useTranslation();
    const location = useLocation();
    console.log(location.pathname)
  //   const {
  //     token: { colorBgContainer },
  //   } = theme.useToken();
  //   const dispatch = useDispatch<AppDispatch>();

  //   const authLayoutStates = useSelector(
  //     (states: RootState) => states.authLayoutSlice,
  //     shallowEqual
  //   );

  //   const loginStates = useSelector(
  //     (states: RootState) => states.loginSlice,
  //     shallowEqual
  //   );

  //   useEffect(() => {
  //     const { searchedFriend } = authLayoutStates;
  //     dispatch(
  //       actions.authLayoutSlice.setAddFriendPopUpVisible(!!searchedFriend.email)
  //     );
  //   }, [authLayoutStates, dispatch]);

  //   const onSearch = () => {
  //     const { searchEmail, searchedFriend, validating } = authLayoutStates;
  //     validating()
  //       .isEmailSchema.validate(searchEmail)
  //       .then(() => {
  //         if (searchEmail !== searchedFriend.email) {
  //           dispatch(
  //             thunks.authLayoutSlice.searchFriendByEmail({
  //               email: searchEmail,
  //             })
  //           );
  //         }
  //       })
  //       .catch((e) => {
  //         dispatch(
  //           actions.routerSlice.setAlert({
  //             message: e.message,
  //             status: false,
  //           })
  //         );
  //       });
  //   };

  const firstMenu = [
    getItem(
      t('auth-layout:first-menu-key?home'),
      'home',
      <HomeOutlined />
    ),
  ];
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" collapsed={true} style={{ position: 'relative' }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
        //   defaultSelectedKeys={[authLayoutStates.firstMenuKey]}
          mode="inline"
          items={firstMenu}
        //   onClick={(e) => {
        //     dispatch(actions.authLayoutSlice.setFirstMenuKey(e.key));
        //   }}
        />
      </Sider>

      {/* <Sider
        theme="dark"
        collapsible={false}
        style={{ backgroundColor: 'white', padding: '16px 0 0 0' }}
        width={220}
      >
        <div className="demo-logo-vertical">
          <Space></Space>
        </div>

        <div style={{ margin: '16px 0' }}>
          {authLayoutStates.secondMenu[authLayoutStates.firstMenuKey]}
        </div>
      </Sider> */}

      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }}>
          <Row justify="space-between" style={{ margin: '0 16px' }}>
            <Col>
              <Input
                prefix={<UserAddOutlined />}
                placeholder={t(
                  'auth-layout:search-input-label?search_by_email'
                )}
                onChange={(e) =>
                  dispatch(
                    actions.authLayoutSlice.setSearchEmail(e.target.value)
                  )
                }
                value={authLayoutStates.searchEmail}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearch();
                  }
                }}
              />
            </Col>
            <Col>
              <Dropdown
                trigger={['click']}
                menu={{
                  items: [
                    {
                      label: (
                        <Button
                          onClick={() => {
                            signOut(auth);
                            dispatch(
                              thunks.loginSlice.setSessionAsync({
                                session: InitISession,
                              })
                            );
                          }}
                          icon={<LogoutOutlined />}
                          type="link"
                          danger
                        >
                          {t('auth-layout:button-label?log_out')}{' '}
                          ({loginStates.session.email})
                        </Button>
                      ),
                      key: '0',
                    },
                  ],
                }}
              >
                <Space>
                  <Button>
                    <MenuOutlined />
                  </Button>
                </Space>
              </Dropdown>
            </Col>
          </Row>
        </Header> */}

        {/* <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
            {authLayoutStates.pages[authLayoutStates.secondMenuKey]}
          </div>
          {authLayoutStates.addFriendPopUpVisible && <AddFriendPopup />}
        </Content> */}
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
