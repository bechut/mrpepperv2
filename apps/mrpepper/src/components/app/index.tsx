import { FC, useEffect, createContext } from 'react';
import { FloatButton, message } from 'antd';

import { Link, useLocation } from 'react-router-dom';
import { languages, onChangeLanguage } from '../../assets/languages';
import { GlobalOutlined } from '@ant-design/icons';
import { IAppContext } from '@mrpepper/types';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions, appDispatch, rootState } from '../../assets/redux';

const defaultContext = {};
export const appContext = createContext<IAppContext>(defaultContext);

const AppComponent: FC<any> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const appStates = useSelector(
    (states: rootState) => states.appSlice,
    shallowEqual
  );
  const dispatch = useDispatch<appDispatch>();

  useEffect(() => {
    onChangeLanguage(location.pathname);
  }, [location]);

  useEffect(() => {
    const {
      alert: { show, status, message },
    } = appStates;

    if (show) {
      messageApi.open({
        type: status ? 'success' : 'error',
        content: message,
      });
      dispatch(actions.appSlice.resetAlert());
    }
  }, [appStates, dispatch, messageApi]);

  return (
    <appContext.Provider value={{}}>
      {contextHolder}
      {children}
      <FloatButton.Group
        icon={<GlobalOutlined />}
        trigger="hover"
        badge={{ count: import.meta.env['VITE_VERSIONING'], color: '#7474f6' }}
      >
        {Object.keys(languages).map((locale: string) => (
          <Link
            key={locale}
            to={window.location.pathname.replace(
              window.location.pathname.slice(1, 3),
              locale
            )}
          >
            <FloatButton icon={locale} />
          </Link>
        ))}
      </FloatButton.Group>
    </appContext.Provider>
  );
};

export default AppComponent;
