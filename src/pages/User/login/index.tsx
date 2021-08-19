import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Tabs, Radio } from 'antd';
import React, { useState, useRef } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { connect } from 'umi';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { ConnectState } from '@/models/connect';
import type { FormInstance } from 'antd/lib/form';
import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>('login');
  const formRef = useRef<FormInstance>();

  const handleLoginSubmit = async () => {
    const { dispatch } = props;
    const values = await formRef?.current?.validateFields();
    setLoading(true);
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    }).then((e: any) => {
      if (e) setLoading(false);
    });
  };

  const handleRegisterSubmit = async () => {
    const { dispatch } = props;
    const values = await formRef?.current?.validateFields();
    setLoading(true);
    dispatch({
      type: 'login/register',
      payload: { ...values, type },
    }).then((e: any) => {
      if (e) setLoading(false);
    });
  };

  return (
    <div className={styles.main}>
      <ProForm
        submitter={{
          searchConfig: {
            submitText: type === 'login' ? 'Log In' : 'Sign Up',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading,
            size: 'large',
            style: {
              width: '100%',
              background: 'rgb(217, 179, 16)',
              borderColor: 'rgb(217, 179, 16)',
            },
          },
        }}
        formRef={formRef}
        onFinish={() => {
          type === 'login' ? handleLoginSubmit() : handleRegisterSubmit(); // eslint-disable-line
          return Promise.resolve();
        }}
      >
        <Tabs className={styles.tab} activeKey={type} onChange={setType}>
          <Tabs.TabPane key="login" tab={'login'} />
          <Tabs.TabPane key="register" tab={'register'} />
        </Tabs>

        {status === 'error' && loginType === 'login' && !submitting && (
          <LoginMessage content={'Incorrect account or password（admin/ant.design)'} />
        )}
        {type === 'login' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Username'}
              rules={[
                {
                  required: true,
                  message: 'Please enter user name!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              rules={[
                {
                  required: true,
                  message: 'Please enter password！',
                },
              ]}
            />
          </>
        )}
        {type === 'register' && (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Please input your email address!'}
            />
            <ProFormText
              name="firstName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Please input your first name!'}
            />
            <ProFormText
              name="lastName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Please input your last name!'}
            />
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Username'}
              rules={[
                {
                  required: true,
                  message: 'Username can not be empty!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Please enter your password'}
              rules={[
                {
                  required: true,
                  message: 'Password can not be empty！',
                },
              ]}
            />
            <ProFormText.Password
              name="confirmPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Please confirm your password'}
              rules={[
                {
                  required: true,
                  message: 'Password can not be empty！',
                },
                {
                  validator: () => {
                    if (
                      formRef?.current?.getFieldValue('confirmPassword') ===
                      formRef?.current?.getFieldValue('password')
                    )
                      return Promise.resolve();
                    return Promise.reject(new Error('Password should be the same'));
                  },
                },
              ]}
            />
            <ProForm.Item
              name="role"
              rules={[{ required: true, message: 'Please select your role!' }]}
            >
              <Radio.Group
                className="roleRadio"
                style={{ color: 'white', justifyContent: 'space-between' }}
              >
                <Radio style={{ color: 'white' }} value="user">
                  Resident
                </Radio>
                <Radio style={{ color: 'white' }} value="admin">
                  Admin
                </Radio>
                <Radio style={{ color: 'white' }} value="maintainer">
                  Maintenance
                </Radio>
              </Radio.Group>
            </ProForm.Item>
          </>
        )}
      </ProForm>
    </div>
  );
};

export default connect(({ login }: ConnectState) => ({
  userLogin: login,
}))(Login);
