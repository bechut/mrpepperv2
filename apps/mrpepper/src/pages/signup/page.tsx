import { FC, lazy, useEffect } from 'react';
import { Button, Card, Form, Space, Typography } from 'antd';
import { ISignUpProps, ISignUpPayload } from '@mrpepper/types';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { pepperAppDispatch, pepperRootState } from '@mrpepper/redux';
import { signupAsync } from './fetch';

const NonAuthLayout = lazy(() => import('../../components/layout/non-auth'));
const EmailInput = lazy(() => import('../../components/form/email-input'));
const UsernameInput = lazy(
  () => import('../../components/form/username-input')
);
const PasswordInput = lazy(
  () => import('../../components/form/password-input')
);

const Page: FC<ISignUpProps> = (props) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const authStates = useSelector(
    (states: pepperRootState) => states.authSlice,
    shallowEqual
  );
  const dispatch = useDispatch<pepperAppDispatch>();
  const navigate = useNavigate();

  const onSignup = (values: ISignUpPayload) => {
    dispatch(signupAsync(values));
  };

  useEffect(() => {
    if (authStates.success) {
      navigate(`/${props.locale}/login`);
    }
  });

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
            {t('sign-up:form-title?sign_up')}
          </Typography.Title>
          <Form
            name="basic"
            onFinish={onSignup}
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

            <UsernameInput
              lang={{
                msg_username_empty: t('sign-up:error-msg?username_empty'),
                label: t('sign-up:form-label?username'),
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
              {t('sign-up:form-title?sign_up')}
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
                {t('log-in:form-button?log_in')}
              </Button>
            </Link>
          </Space>
        </Card>
      </div>
    </NonAuthLayout>
  );
};

export default Page;
