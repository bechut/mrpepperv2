import { message } from 'antd';
import { AppDispatch, RootState, actions } from '../../../assets/redux/store';
import { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { onChangeLanguage } from '../../../assets/locales';

const AppComponent: React.FC<any> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const routerStates = useSelector(
    (states: RootState) => states.appSlice,
    shallowEqual
  );

  useEffect(() => {
    onChangeLanguage(location.pathname);
  }, [location]);

  useEffect(() => {
    const { show, status, message } = routerStates.alert;
    if (show) {
      messageApi.open({
        type: status ? 'success' : 'error',
        content: message,
      });
      dispatch(actions.appSlice.resetAlert());
    }
  }, [routerStates, dispatch, messageApi]);

  return (
    <div>
      {contextHolder}
      {children}
    </div>
  );
};

export default AppComponent;
