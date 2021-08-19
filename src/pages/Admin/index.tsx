import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ServiceTable from '@/components/commonComponents/ServiceTable';
import type { CurrentUser } from '@/models/user';
import { ConnectState } from '@/models/connect';
import { ConnectProps, connect } from 'umi';

export interface AdminProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser;
}

const Admin: React.FC<AdminProps> = (props) => {
  const {currentUser} = props;
  return (
    <>
      <PageHeaderWrapper>
        <ServiceTable userType={currentUser?.role} fetchUrl={'commprop/fetchTableChanges'} />
      </PageHeaderWrapper>
    </>
  );
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(Admin);