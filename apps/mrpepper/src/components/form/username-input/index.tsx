import { IUsernameInputProps } from '@mrpepper/types';
import { Form, Input } from 'antd';
import { FC } from 'react';

const UsernameInput: FC<IUsernameInputProps> = ({ label, placeholder, msg }) => {
  return (
    <Form.Item
      name="username"
      label={label}
      rules={[
        { required: true, message: msg.error.required },
      ]}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default UsernameInput;
