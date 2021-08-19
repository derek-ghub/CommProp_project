import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import CMPTable from '@/components/commonComponents/CMPTable';
import type { CurrentUser } from '@/models/user';
import { ConnectState } from '@/models/connect';
import { ConnectProps, connect } from 'umi';

export interface ResidentProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser;
}

const Amenities: React.FC<ResidentProps> = (props) => {
  const {currentUser} = props;
  const columns:ProColumns[] = [
    {
      title: 'Facility',
      dataIndex: 'facility',
      width: '1000px',
      align: 'center',
      editable: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '1000px',
      align: 'center',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '50%',
      align: 'center',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      valueType: 'option',
      align: 'center',
      width: '20%',
      render: (text: any, record: any, _, action: any) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.key);
          }}
        >
          edit
        </a>,
      ],
    },
  ];

  return (
    <>
      <PageHeaderWrapper>
        <CMPTable
          userType={currentUser?.role}
          tableType={'ATable'}
          columns={columns}
          fetchUrl={'commprop/fetchAmenitiesChanges'}
        />
      </PageHeaderWrapper>
    </>
  );
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(Amenities);
