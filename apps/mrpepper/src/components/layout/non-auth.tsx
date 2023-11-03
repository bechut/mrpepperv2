import { FC, useEffect } from 'react';
import { message } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  pepperActions,
  pepperAppDispatch,
  pepperRootState,
} from '@mrpepper/redux';

const NonAuthLayout: FC<any> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const appStates = useSelector(
    (states: pepperRootState) => states.appSlice,
    shallowEqual
  );
  const dispatch = useDispatch<pepperAppDispatch>();

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

  return (
    <div>
      {contextHolder}
      {children}
    </div>
  );
};

export default NonAuthLayout;
