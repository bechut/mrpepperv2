import { IUsernameInput } from '@mrpepper/types';
import { Form, Input } from 'antd';
import { FC } from 'react';

const UsernameInput: FC<IUsernameInput> = ({ lang }) => {
  return (
    <Form.Item
      name="username"
      label={lang.label}
      rules={[{ required: true, message: lang.msg_username_empty }]}
    >
      <Input type="text" placeholder={lang.placeholder} />
    </Form.Item>
  );
};

export default UsernameInput;
