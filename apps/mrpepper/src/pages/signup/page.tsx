import { FC } from 'react';
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import { ISignUpProps, ISignUpPayload } from '@mrpepper/types';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Page: FC<ISignUpProps> = (props) => {
  const [form] = Form.useForm();

  const onSignup = (values: ISignUpPayload) => {
    // dispatch(thunks.auth.signup(values));
    // clickCount = 1;
  };

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
        {/* <Typography.Title level={2}>{t('sign-up:form-title?sign_up')}</Typography.Title> */}
        <Typography.Title level={3}>Sign Up</Typography.Title>
        <Form
          name="basic"
          onFinish={onSignup}
          labelAlign="left"
          labelCol={{ xs: 24 }}
          form={form}
        >
          <Form.Item
            name="email"
            label="Email"
            // label={t('sign-up:form-label?email')}
            // rules={[
            //   { required: true, message: t('sign-up:error-msg?email_empty') },
            //   {
            //     type: 'email',
            //     message: t('sign-up:error-msg?email_invalid_format'),
            //   },
            // ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            // label={t('sign-up:form-label?username')}
            // rules={[
            //   {
            //     required: true,
            //     message: t('sign-up:error-msg?username_empty'),
            //   },
            // ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            // label={t('sign-up:form-label?password')}
            // rules={[
            //   {
            //     required: true,
            //     message: 'Password is required',
            //   },
            //   {
            //     min: 8,
            //     message: t('sign-up:error-msg?password_length_8_characters'),
            //   },
            // ]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            // loading={authStates.loading}
            htmlType="submit"
            type="primary"
          >
            Sign up
            {/* {t('sign-up:form-button?sign_up')} */}
          </Button>
        </Form>
        <Space direction="vertical" style={{ margin: '8px 0' }}>
          <Link to={`/en/login`}>
            <Button
              // loading={authStates.loading}
              htmlType="button"
              type="link"
              icon={<ArrowLeftOutlined />}
            >
              {/* {t('log-in:form-button?log_in')} */}
              Log in
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};

export default Page;
