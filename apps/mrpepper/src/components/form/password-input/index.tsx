import { IPasswordInputProps } from '@mrpepper/types';
import { Form, Input } from 'antd';
import { FC } from 'react';

const PasswordInput: FC<IPasswordInputProps> = ({ label, placeholder, msg }) => {
  return (
    <Form.Item
      name="password"
      label={label}
      rules={[
        { required: true, message: msg.error.required },
        {
          min: 8,
          message: msg.error.len,
        },
      ]}
    >
      <Input.Password placeholder={placeholder} />
    </Form.Item>
  );
};

export default PasswordInput;
