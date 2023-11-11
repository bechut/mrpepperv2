import { IEmailInputProps } from '@mrpepper/types';
import { Form, Input } from 'antd';
import { FC } from 'react';

const EmailInput: FC<IEmailInputProps> = ({ label, placeholder, msg }) => {
  return (
    <Form.Item
      name="email"
      label={label}
      rules={[
        { required: true, message: msg.error.required },
        {
          type: 'email',
          message: msg.error.invalid,
        },
      ]}
    >
      <Input type="email" placeholder={placeholder} />
    </Form.Item>
  );
};

export default EmailInput;
