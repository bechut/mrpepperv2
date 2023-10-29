import React, { useEffect } from 'react';
import {
  AppDispatch,
  RootState,
  actions,
  thunks,
} from '../../../assets/redux/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Button, Card, Form, Input, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

export interface ISignup {
  email: string;
  username: string;
  password: string;
}

let clickCount = 0;

const Page: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const authStates = useSelector(
    (states: RootState) => states.authSlice,
    shallowEqual
  );
  const onSignup = (values: ISignup) => {
    dispatch(thunks.auth.signup(values));
    clickCount = 1;
  };

  useEffect(() => {
    if (!authStates.loading && clickCount > 0) {
      form.resetFields();
      clickCount = 0;
    }

    if (authStates.success && clickCount > 0) {
      form.resetFields();
      clickCount = 0;

      setTimeout(() => {
        navigate(`/en/login`);
        dispatch(actions.authSlice.reset());
      }, 3000);
    }
  }, [authStates, form, navigate, dispatch]);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Card
        style={{
          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <h2>Sign Up</h2>
        <Form
          name="basic"
          onFinish={onSignup}
          labelAlign="left"
          labelCol={{ xs: 24 }}
          form={form}
        >
          <Form.Item
            name="email"
            label={'Email'}
            rules={[
              { required: true, message: 'Email is required' },
              {
                type: 'email',
                message: 'Invalid emal format',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label={'Username'}
            rules={[
              {
                required: true,
                message: 'Username is required',
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            name="password"
            label={'Password'}
            rules={[
              {
                required: true,
                message: 'Password is required',
              },
              {
                min: 8,
                message: 'Password must be 8 characters at least',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button loading={authStates.loading} htmlType="submit" type="primary">
            Sign up
          </Button>
        </Form>
        <Space direction="vertical" style={{ margin: '8px 0' }}>
          <Link to={`/en/login`}>
            <Button
              loading={authStates.loading}
              htmlType="button"
              type="link"
              icon={<ArrowLeftOutlined />}
            >
              {'Log in'}
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};

export default Page;
