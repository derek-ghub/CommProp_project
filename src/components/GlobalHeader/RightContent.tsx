import { Tooltip, Tag } from 'antd';
import type { Settings as ProSettings } from '@ant-design/pro-layout';
import { GithubOutlined } from '@ant-design/icons';
import React from 'react';
import type { ConnectProps } from 'umi';
import { connect, SelectLang } from 'umi';
import type { ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  theme?: ProSettings['navTheme'] | 'realDark';
} & Partial<ConnectProps> &
  Partial<ProSettings>;

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      {/* <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Site Search"
        defaultValue="welcome"
        options={[
          { label: <a href="/welcome">Welcome</a>, value: 'welcome' },
          {
            label: <a href="/resident">Resident</a>,
            value: 'resident',
          },
        ]}
        // onSearch={value => {
        //   //console.log('input', value);
        // }}
      /> */}
      <Tooltip title="Github Repo">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://github.com/xdietcode/CommPropMgmt"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <GithubOutlined />
        </a>
      </Tooltip>
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
