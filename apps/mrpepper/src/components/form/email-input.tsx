import { IEmailInput } from '@mrpepper/types';
import { Form, Input } from 'antd';
import { FC } from 'react';

const EmailInput: FC<IEmailInput> = ({ lang }) => {
  return (
    <Form.Item
      name="email"
      label={lang.label}
      rules={[
        { required: true, message: lang.msg_email_empty },
        {
          type: 'email',
          message: lang.msg_email_invalid,
        },
      ]}
    >
      <Input type="email" placeholder={lang.placeholder} />
    </Form.Item>
  );
};

export default EmailInput;
