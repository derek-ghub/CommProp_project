import React, { useState } from 'react';
import { Tabs, Anchor } from 'antd';
import type { ProColumnType } from '@ant-design/pro-table';
import CMPTable from '@/components/commonComponents/CMPTable';
import './index.less';

type ServiceProps = {
  userType: any;
  fetchUrl: any;
};

type TaskType = {};

const columns: ProColumnType<TaskType>[] = [
    {
        title: 'Service ID',
        dataIndex: 'key',
    },
    {
      title: 'User ID',
      dataIndex: 'userid',
      valueType: 'textarea',
  },
    {
        title: 'Service Type',
        dataIndex: 'service',
        valueType: 'textarea',
    },
    {
        title: 'Last scheduled time ',
        sorter: true,
        dataIndex: 'date',
        valueType: 'dateTime',
        renderFormItem: (item, { defaultRender }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '4') {
            return false;
        }

        return defaultRender(item);
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        valueType: 'textarea',
    },
];

const { TabPane } = Tabs;

const ServiceTable: React.FC<ServiceProps> = (props) => {
  const { userType, fetchUrl } = props;
  const [selectTab, setSelectTab] = useState('open');

  const tablist = [
    {
      key: 'open',
      tab: 'Open',
    },
    {
      key: 'pending',
      tab: 'Pending',
    },
    {
      key: 'processing',
      tab: 'Processing',
    },
    {
      key: 'completed',
      tab: 'Completed',
    },
  ];

  const tablist2 = [
    {
      key: 'pending',
      tab: 'Pending',
    },
    {
      key: 'processing',
      tab: 'Processing',
    },
    {
      key: 'completed',
      tab: 'Completed',
    },
  ];

  const panes: React.ReactNode[] = [];
  if (userType === 'maintainer') {
    tablist2.forEach((o) => {
      panes.push(<TabPane tab={o.tab} key={o.key} style={{ margin: 0 }} />);
    });
  } else {
    tablist.forEach((o) => {
      panes.push(<TabPane tab={o.tab} key={o.key} style={{ margin: 0 }} />);
    });
  }

  const filterColumns = columns.filter((o: any) => {
    if (userType === 'resident' || userType === 'maintainer') return o.dataIndex !== 'userid';
    return o.dataIndex !== '';
  });

  return (
    <>
      <div className={'resident-tab'}>
        <Anchor>
          <Tabs
            animated={false}
            type="card"
            style={{ backgroundColor: 'transparent', fontWeight: 600 }}
            defaultActiveKey="1"
            onChange={(e) => {
              setSelectTab(e);
            }}
          >
            {panes}
          </Tabs>
        </Anchor>
      </div>

      <CMPTable
        userType={userType}
        tableType={'compTable'}
        columns={filterColumns}
        status={selectTab}
        fetchUrl={fetchUrl}
      />
    </>
  );
};

export default ServiceTable;
