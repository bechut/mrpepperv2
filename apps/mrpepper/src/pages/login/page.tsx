import { FC, lazy } from 'react';
import { Form, Card, Typography, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ILoginProps } from '@mrpepper/types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { pepperAppDispatch, pepperRootState } from '@mrpepper/redux';

const NonAuthLayout = lazy(() => import('../../components/layout/non-auth'));
const EmailInput = lazy(() => import('../../components/form/email-input'));
const PasswordInput = lazy(
  () => import('../../components/form/password-input')
);

const Page: FC<ILoginProps> = (props) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const authStates = useSelector(
    (states: pepperRootState) => states.authSlice,
    shallowEqual
  );
  const dispatch = useDispatch<pepperAppDispatch>();

  const onLogin = () => {
    //
  };

  return (
    <NonAuthLayout>
      <div style={{ height: '100vh', position: 'relative' }}>
        <Card
          style={{
            top: '50%',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Typography.Title level={2}>
            {t('login:form-title?log_in')}
          </Typography.Title>
          <Form
            name="basic"
            onFinish={onLogin}
            labelAlign="left"
            labelCol={{ xs: 24 }}
            form={form}
          >
            <EmailInput
              lang={{
                msg_email_empty: t('sign-up:error-msg?email_empty'),
                msg_email_invalid: t('sign-up:error-msg?email_invalid_format'),
                label: t('sign-up:form-label?email'),
                placeholder: '',
              }}
            />

            <PasswordInput
              lang={{
                msg_password_empty: t('sign-up:error-msg?username_empty'),
                msg_password_length: t(
                  'sign-up:error-msg?password_length_8_characters'
                ),
                label: t('sign-up:form-label?password'),
                placeholder: '',
              }}
            />
            <Button
              loading={authStates.loading}
              htmlType="submit"
              type="primary"
            >
              {t('login:form-title?log_in')}
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
                {t('sign-up:form-button?sign_up')}
              </Button>
            </Link>
          </Space>
        </Card>
      </div>
    </NonAuthLayout>
  );
};

export default Page;
