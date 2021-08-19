import React, { useState, useEffect, useRef } from 'react';
import { ConnectProps, connect } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import CommonCard from '@/components/commonComponents/commonCard';
import { Button, ConfigProvider, message, Input, Timeline } from 'antd';
import ProTable from '@ant-design/pro-table';
import { debounce } from 'lodash';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import type { CurrentUser } from '@/models/user';
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormTextArea,
  ProFormText,
} from '@ant-design/pro-form';
import enUSIntl from 'antd/lib/locale/en_US';
import './index.less';

interface Commprop {
  compTable?: any;
  amentityTable?: any;
}

type TaskType = {};

export interface CMPTableProps extends Partial<ConnectProps> {
  status?: any;
  dispatch: any;
  fetchUrl?: string;
  commprop: Commprop;
  columns: any;
  tableType: any;
  userType: any;
  currentUser?: CurrentUser;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const jobType = [
  {
    value: 'Electrical Applicances',
    label: 'Electrical Applicances',
  },
  {
    value: 'Bathroom',
    label: 'Bathroom',
  },
  {
    value: 'Balcony',
    label: 'Balcony',
  },
  {
    value: 'Elevator',
    label: 'Elevator',
  },
  {
    value: 'Air Condition',
    label: 'Air Condition',
  },
];

const completeType = [
  {
    value: 'Solved',
    label: 'Solved',
  },
  {
    value: 'Cancelled',
    label: 'Cancelled',
  },
];

let filterData: any = [];

const CMPTable: React.FC<CMPTableProps> = (props) => {
  const { status, fetchUrl, commprop, columns, tableType, currentUser, userType } = props;
  const { compTable, amentityTable } = commprop;
  const [ tableData, setTableData ] = useState(compTable[status] || []);
  const [ tableDataFiltered, setTableDataFiltered ] = useState([]);
  const actionRef = useRef<ActionType>();
  const [ serviceModalVisible, setServiceModalVisible ] = useState<boolean>(false);
  const [ amenityModalVisible, setAmenityModalVisible ] = useState<boolean>(false);
  const [ completeModalVisible, setCompleteModalVisible ] = useState<boolean>(false);
  const [ selectedRowsState, setSelectedRows ] = useState<TaskType[]>([]);

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]); // use proColumn

  const filterCols: any = {};

  useEffect(() => {
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: fetchUrl,
        payload: { status },
      });
    }
  }, []);

  useEffect(() => {
    // fetchTableData();
    updateTableLocally(tableType);
  }, [status]);

  useEffect(() => {
    if (tableType === 'compTable') {
      setTableData(compTable[status]);
      localStorage.setItem(tableType, JSON.stringify(compTable));
    }
    if (tableType === 'ATable') {
      setTableData(amentityTable);
      localStorage.setItem(tableType, JSON.stringify(amentityTable));
    }
  }, [commprop]);

  
  useEffect(() => {
    setTableDataFiltered(tableData);
  }, [tableData]);

  
  let newColumns = columns;

  if (tableType === "ATable") {
    if (userType === "resident" || userType === "maintainer") {
      newColumns = columns.filter((col:any) => {return col.dataIndex !== 'operation'});
    }
  } 

  const updateTableLocally = (type: any) => {
    const localTable = JSON.parse(localStorage.getItem(type) || '');
    setTableData(localTable[status] || localTable);
  }

  const handleBatch = (handleType: any) => {
    const selectData = tableData.filter((o: any) => {
      return selectedRowsState.indexOf(o.key) !== -1;
    });
    const { dispatch } = props;
    if (dispatch) {
      if (tableType === 'ATable'){
        if (handleType === 'book') {
          dispatch({
            type: 'commprop/updateAmenityForm',
          }).then(() => {
            waitTime(2000);
            message.success(`You has successfully booked one computer`);
          })
        }
      }
      if (tableType === 'compTable') {
        if (handleType === 'approved') {
          dispatch({
            type: 'commprop/request',
            payload: {
              origin: compTable,
              data: selectData,
              requestType: 'approveOpenService',
            },
          }).then((e: any) => {
            if (e.status === 'ok') {
              message.success(`Admin ${currentUser?.userid} has approved ${selectedRowsState.length} services`);
              localStorage.setItem(tableType, JSON.stringify(e.data));
              updateTableLocally(tableType);
            } else {
              message.error(`Fail to approve services`);
              return;
            }
            setServiceModalVisible(false);
          });
        }
        if (handleType === 'cancell') {
          dispatch({
            type: 'commprop/request',
            payload: {
              origin: compTable,
              data: selectData,
              requestType: 'cancellPendingService/admin',
            },
          }).then((e: any) => {
            if (e.status === 'ok') {
              message.success(`Admin ${currentUser?.userid} has cancelled ${selectedRowsState.length} services`);
              localStorage.setItem(tableType, JSON.stringify(e.data));
              updateTableLocally(tableType);
            } else {
              message.error(`Fail to approve services`);
              return;
            }
            setServiceModalVisible(false);
          });
        }
        if (handleType === 'selected') {
          dispatch({
            type: 'commprop/request',
            payload: {
              origin: compTable,
              data: selectData,
              requestType: 'selectedService/maintainer',
            },
          }).then((e: any) => {
            if (e.status === 'ok') {
              message.success(`Maintainer ${currentUser?.userid} has selected ${selectedRowsState.length} services`);
              localStorage.setItem(tableType, JSON.stringify(e.data));
              updateTableLocally(tableType);
            } else {
              message.error(`Fail to approve services`);
              return;
            }
            setServiceModalVisible(false);
          });
        }
        if (handleType.Complete) {
          if (handleType?.Complete === 'Cancelled') {
            dispatch({
              type: 'commprop/request',
              payload: {
                origin: compTable,
                data: selectData,
                requestType: 'cancellProcessingService/maintainer',
              },
            }).then((e: any) => {
              if (e.status === 'ok') {
                message.success(`Maintainer ${currentUser?.userid} has cancelled 2 services`);
                localStorage.setItem(tableType, JSON.stringify(e.data));
                updateTableLocally(tableType);
              } else {
                message.error(`Fail to approve services`);
                return;
              }
              setCompleteModalVisible(false);
            });
          }
          if (handleType?.Complete === 'Solved') {
            dispatch({
              type: 'commprop/request',
              payload: {
                origin: compTable,
                data: selectData,
                requestType: 'solvedProcessingService/maintainer',
              },
            }).then((e: any) => {
              if (e.status === 'ok') {
                message.success(`Maintainer ${currentUser?.userid} has solved 2 services`);
                localStorage.setItem(tableType, JSON.stringify(e.data));
                updateTableLocally(tableType);
              } else {
                message.error(`Fail to approve services`);
                return;
              }
              setCompleteModalVisible(false);
            });
          }
        }
      }
    }
  };

  const dataFilter = (originData: any, value: any, key: any) => {
    const tempData: any[] = [];
    filterCols[key] = value;
    const filterKeysOld = Object.keys(filterCols);
    const filterReg = {};
    let regchecking = false;
    filterKeysOld.forEach((fk) => {
      try {
        filterReg[fk] = new RegExp(filterCols[fk], 'i');
        regchecking = true;
      } catch (e) {
        regchecking = false;
      }
    });

    originData.forEach((idx: any) => {
      let dataMatch = true;
      filterKeysOld.forEach((k) => {
        if (regchecking && !filterReg[k].test(idx[k])) {
          dataMatch = false;
        } else if (regchecking && !filterReg[k].test(idx[k])) {
          dataMatch = false;
        }
      });

      if (dataMatch) {
        tempData.push(idx);
      }
    });
    return tempData;
  };

  const filterOnChange = (value: string, key: any) => {
    filterData = dataFilter(tableData, value, key);
    setTableDataFiltered(filterData);
  };

  const debounceSearch = debounce((value, key) => {
    filterOnChange(value, key);
  }, 500);

  newColumns.forEach((e: any) => {
    const eValue: any = e;
    eValue.algin = 'center';
    eValue.children = tableType !=="ATable"?[
      {
        title: (
          <Input
            placeholder="input to filter"
            id={`${userType}${e.dataIndex}`}
            key={e.dataIndex}
            onChange={(a: any) => {
              const { value } = a.target;
              debounceSearch(value, e.dataIndex);
            }}
            value={filterCols[e.dataIndex]}
          />
        ),
        dataIndex: e.dataIndex,
        align: 'center',
      },
    ] : [];
  });

  // update AmenityStatus on front end
  const updateAmenityStatus = (key:any, rowdata:any) => {
    console.log("in updateAmenityStatus");
    tableData.forEach((idx: any,index: any) => {

      if (idx.key === key) {
        console.log(tableData[index]);
        const tempData = JSON.parse(JSON.stringify(tableData));
        tempData[index] = rowdata;
        setTableData(tempData);
        return ;
      }
    });
    
  };

  let toolBar: React.ReactNode[] = [];
  if (userType === 'resident' && tableType !== 'ATable') {
    toolBar = [
      <Button
        type="primary"
        key="primary"
        onClick={() => {
          setServiceModalVisible(true);
        }}
      >
        <PlusOutlined /> New
      </Button>,
    ];
  } else if (tableType === 'ATable' && userType === 'admin') {
    toolBar = [
      <Button
        type="primary"
        key="primary"
        onClick={() => {
          setAmenityModalVisible(true);
        }}
      >
        <PlusOutlined /> Add
      </Button>,
    ];
  }
    
  const rowExpandable = (userType: any, status: any) => {
    if (userType === 'resident') {
      if (tableType !== 'ATable') return true;
    }
    if (userType === 'admin') {
      if (status === 'processing' || status === 'completed') return true;
    }
    if (userType === 'maintainer' && status === 'completed') return false;
    return false;
  }

  const rowSelected = (userType: any, status: any) => {
    if (userType === 'resident') {
      if (tableType === 'ATable') return true;
    }
    if (userType === 'admin') {
      if (status === 'open' || status === 'pending') return true;
    }
    if (userType === 'maintainer') {
      if (status === 'open' || status === 'processing' || status === 'pending') return true;
    }
    return false;
  }

  return (
    <div className={'cmp-table'}>
      <CommonCard title={status}>
        <ConfigProvider locale={enUSIntl}>
          <ProTable
            headerTitle={'Enquiry form'}
            actionRef={actionRef}
            rowKey="key"
            search={false}
            toolBarRender={() => toolBar}
            pagination={{
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            columns={newColumns}
            expandable={{
              expandedRowRender: (record: any) => (
                <>
                  <div style={{ margin: 'auto', width: '20%' }}>
                    <p style={{ marginTop: '0', fontWeight: 'bold' }}>Service Status</p>
                    {userType === 'admin' ? <p style={{ fontWeight: 'bold' }}>{`User ID: ${currentUser?.userid}`}</p> : ''}
                    <Timeline className={'cmp-timeline'}>
                      {record?.status ? (
                        record?.status.map((o: any) => {
                          return (
                            <Timeline.Item color={o.color}>
                              {o.info} {o.date}
                            </Timeline.Item>
                          );
                        })
                      ) : (
                        <Timeline>No status update yet</Timeline>
                      )}
                    </Timeline>
                  </div>
                </>
              ),
              rowExpandable: () => rowExpandable(userType, status),
            }}
            dataSource={tableDataFiltered || []}
            tableAlertRender={false}
            rowSelection={
              rowSelected(userType, status)
                ? {
                    onChange: (selectedRowsKeys, data) => {
                      console.log(selectedRowsKeys, data);
                      setSelectedRows(selectedRowsKeys);
                    },
                  }
                : false
            }
            onChange={setTableData}
            editable={
              userType === 'admin'
                ? {
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                      console.log(rowKey, data, row);
                      updateAmenityStatus(rowKey, data);
                      await waitTime(1000);
                    },
                    onChange: setEditableRowKeys,
                    actionRender: (row, config, dom) => [dom.save, dom.cancel],
                  }
                : {}
            }
          />
          
          {selectedRowsState?.length > 0 && (
            <FooterToolbar
              extra={
                <div>
                  Chosen
                  <a style={{ fontWeight: 600, marginLeft: '3px' }}>
                    {selectedRowsState.length}
                  </a>{' '}
                  items &nbsp;&nbsp;
                </div>
              }
            >
              {rowSelected(userType, status) ? (
                <Button type="primary" onClick={() => {
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                  }}>
                  Clear Select
                </Button>
              ) : null}
              {userType === 'admin' && status === 'open' ? (
                <Button type="primary" onClick={() => {
                  handleBatch('approved');
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                  }}>
                  Batch approval
                </Button>
              ) : null}
              {userType === 'resident' && tableType === 'ATable' ? (
                <Button type="primary" onClick={() => {
                  handleBatch('book');
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                  }}>
                  Book Amenities
                </Button>
              ) : null}
              {userType === 'admin' && status === 'pending' ? (
                <Button type="primary" onClick={() => {
                  handleBatch('cancell');
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                  }}>
                  Batch Cancell
                </Button>
              ) : null}
              {userType === 'maintainer' && status === 'pending' ? (
                <Button type="primary" onClick={() => {
                  handleBatch('selected');
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }}>
                  Batch Select
                </Button>
              ) : null}
              {userType === 'maintainer' && status === 'processing' ? (
                <Button type="primary" onClick={() => {
                  setCompleteModalVisible(true);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }}>
                  Batch Completed
                </Button>
              ) : null}
            </FooterToolbar>
          )}

          <ModalForm
            title={'Complete Services'}
            width="400px"
            visible={completeModalVisible}
            modalProps={{
              onCancel: () => setCompleteModalVisible(false),
            }}
            onFinish={async (value) => {
              handleBatch(value);
            }}
          >
            <ProFormSelect
              label="Complete Status"
              rules={[
                {
                  required: true,
                  message: 'Complete type is required',
                },
              ]}
              width="md"
              name="Complete"
              options={completeType}
            />
          </ModalForm>

          <ModalForm
            title={'New Service'}
            width="400px"
            visible={serviceModalVisible}
            modalProps={{
              onCancel: () => setServiceModalVisible(false),
            }}
            onFinish={async (value) => {
              const { dispatch } = props;
              if (dispatch) {
                dispatch({
                  type: 'commprop/request',
                  payload: {
                    origin: compTable,
                    data: value,
                    currentUser,
                    requestType: 'addNewService',
                  },
                }).then((e: any) => {
                  if (e.status === 'ok') {
                    message.success('Add Success');
                    localStorage.setItem(tableType, JSON.stringify(e.data));
                    updateTableLocally(tableType);
                  } else {
                    message.error(`Fail to add new services`);
                    return;
                  }
                  setServiceModalVisible(false);
                });
              }
            }}
          >
            <ProFormSelect
              label="service"
              rules={[
                {
                  required: true,
                  message: 'Service type is required',
                },
              ]}
              width="md"
              name="service"
              //name="type"
              options={jobType}
            />
            <ProFormTextArea width="md" name="description" />
          </ModalForm>

          <ModalForm
            title={'New Amenity'}
            width="400px"
            visible={amenityModalVisible}
            modalProps={{
              onCancel: () => setAmenityModalVisible(false),
            }}
            onFinish={async (value) => {
              const { dispatch } = props;
              if (dispatch) {
                dispatch({
                  type: 'commprop/request',
                  payload: {
                    origin: amentityTable,
                    data: value,
                    requestType: 'addNewAmenity',
                  },
                }).then((e: any) => {
                  if (e.status === 'ok') {
                    message.success('Add Success');
                    localStorage.setItem(tableType, JSON.stringify(e.data));
                    updateTableLocally(tableType);
                  } else {
                    message.error(`Fail to add new Amenity`);
                    return;
                  }
                  setAmenityModalVisible(false);
                });
              }
            }}
          >
            <ProForm.Group>
              <ProFormText
                width="md"
                name="facility"
                label="Facility"
                placeholder="Please Enter the facility name"
              />
              <ProFormText
                width="md"
                name="status"
                label="Status"
                placeholder="Please Enter the current available status"
              />
              <ProFormTextArea
                width="md"
                name="description"
                label="Description"
                placeholder="Describe this facility"
              />
            </ProForm.Group>
          </ModalForm>
        </ConfigProvider>
      </CommonCard>
    </div>
  );
};

export default connect(({ commprop, user }: ConnectState) => ({
  commprop,
  currentUser: user.currentUser,
}))(CMPTable);
