import { FC, useEffect } from 'react';
import { FloatButton, message } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  pepperActions,
  pepperAppDispatch,
  pepperRootState,
} from '@mrpepper/redux';
import { Link, useLocation } from 'react-router-dom';
import { languages, onChangeLanguage } from '../../assets/languages';
import { GlobalOutlined } from '@ant-design/icons';

const NonAuthLayout: FC<any> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const appStates = useSelector(
    (states: pepperRootState) => states.appSlice,
    shallowEqual
  );
  const dispatch = useDispatch<pepperAppDispatch>();
  const location = useLocation();

  useEffect(() => {
    const {
      alert: { show, status, message },
    } = appStates;

    if (show) {
      messageApi.open({
        type: status ? 'success' : 'error',
        content: message,
      });
      dispatch(pepperActions.appSlice.resetAlert());
    }
  }, [appStates, dispatch, messageApi]);

  useEffect(() => {
    onChangeLanguage(location.pathname);
  }, [location]);

  return (
    <div>
      {contextHolder}
      {children}
      <FloatButton.Group icon={<GlobalOutlined />} trigger="hover">
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
    </div>
  );
};

export default NonAuthLayout;
