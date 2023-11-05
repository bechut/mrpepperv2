import { IPasswordInput } from '@mrpepper/types';
import { Form, Input } from 'antd';
import { FC } from 'react';

const PasswordInput: FC<IPasswordInput> = ({ lang }) => {
  return (
    <Form.Item
      name="password"
      label={lang.label}
      rules={[
        { required: true, message: lang.msg_password_empty },
        { min: 8, message: lang.msg_password_length },

      ]}
    >
      <Input type="password" placeholder={lang.placeholder} />
    </Form.Item>
  );
};

export default PasswordInput;
