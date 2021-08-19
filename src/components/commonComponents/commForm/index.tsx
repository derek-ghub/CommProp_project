// /*
// fetTableData --> user New: add open obj --> postData --> fetTableData
//                  admin approve: peak open obj --> insert pending --> postData --> fetTableData
//                  cancel: user:  peak open obj --> insert cancel --> postData --> fetTableData
//                          admin: peak open/pending obj --> insert cancel + update comment --> postData --> fetTableData
//                  maintainer process: peak pending obj --> insert process --> postData --> fetTableData
//                             complete: peak process obj --> insert complete + update comment --> postData --> fetTableData

//   new obj: {
//     userid: xxx
//     type:
//     desc:
//     (updatedAt)
//   }
//    userid: any,
//    requestIds: any,
//    description: any,
//    status: String,

//   -->

//   open/.../ obj: {
//     serviceID:
//     type:
//     desc: (change)
//     updatedAt:
//     status: (change)
//   }
//    userid: any,
//    firstName: String,
//    lastName: String,
//    service: String,
//    description: String,
//    status: String,
// */

// import React, { useState, useEffect } from 'react';
// import 'antd/dist/antd.css';
// import './index.less';
// import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';

// import { ConnectProps, connect } from 'umi';
// import { ConnectState } from '@/models/connect';

// interface Commprop {
//   compForm?: any;
// }

// export interface commFormProps extends Partial<ConnectProps> {
//   status: any;
//   dispatch: any;
//   fetchUrl?: string;
//   commprop: Commprop;
// }

// interface EditableCellProps {
//   editing: any;
//   dataIndex: any;
//   title: any;
//   inputType: any;
//   record: any;
//   index: any;
// }

// const EditableCell: React.FC<EditableCellProps> = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

// const CMPForm: React.FC<commFormProps> = (props) => {
//   const { status, fetchUrl, commprop } = props;
//   const { compForm } = commprop;
//   const [form] = Form.useForm();
//   const [data, setData] = useState(compForm?.data);
//   const [editingKey, setEditingKey] = useState('');
//   const [editableState] = useState(true);

//   useEffect(() => {
//     const { dispatch } = props;
//     if (dispatch) {
//       dispatch({
//         type: fetchUrl,
//         payload: { status },
//       });
//     }
//   }, []);

//   useEffect(() => {
//     setData(compForm.data);
//   }, [compForm]);

//   const isEditing = (record: any) => record.key === editingKey;

//   const edit = (record: any) => {
//     form.setFieldsValue({
//       facility: '',
//       status: '',
//       desc: '',
//       ...record,
//     });
//     setEditingKey(record.key);
//   };

//   const cancel = () => {
//     setEditingKey('');
//   };

//   const save = async (key: any) => {
//     try {
//       const row = await form.validateFields();
//       const newData = [...data];
//       const index = newData.findIndex((item) => key === item.key);

//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, { ...item, ...row });
//         setData(newData);
//         setEditingKey('');
//       } else {
//         newData.push(row);
//         setData(newData);
//         setEditingKey('');
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };

//   const columns = [
//     {
//       title: 'Facility',
//       dataIndex: 'facility',
//       width: '25%',
//       editable: false,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       width: '10%',
//       editable: editableState,
//     },
//     {
//       title: 'Description',
//       dataIndex: 'desc',
//       width: '40%',
//       editable: editableState,
//     },
//     {
//       title: 'operation',
//       dataIndex: 'operation',
//       visible: editableState,
//       render: (_: any, record: any) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <a
//               href="javascript:;" // eslint-disable-line
//               onClick={() => save(record.key)}
//               style={{
//                 marginRight: 8,
//               }}
//             >
//               Save
//             </a>
//             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//               <a>Cancel</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//             Edit
//           </Typography.Link>
//         );
//       },
//     },
//   ];
//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }

//     return {
//       ...col,
//       onCell: (record: any) => ({
//         record,
//         inputType: col.dataIndex === 'age' ? 'number' : 'text',
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });
//   return (
//     <Form form={form} component={false}>
//       <Table
//         components={{
//           body: {
//             cell: EditableCell,
//           },
//         }}
//         bordered
//         dataSource={data || []}
//         columns={mergedColumns}
//         rowClassName="editable-row"
//         pagination={{
//           onChange: cancel,
//         }}
//       />
//     </Form>
//   );
// };

// export default connect(({ commprop }: ConnectState) => ({
//   commprop,
// }))(CMPForm);
/*
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.less';
import { Table, Input, InputNumber, Form, Typography } from 'antd';

import { ConnectProps, connect } from 'umi';
import { ConnectState } from '@/models/connect';

interface Commprop {
  compForm?: any;
}

export interface commFormProps extends Partial<ConnectProps> {
  
  dispatch: any;
  fetchUrl?: string;
  commprop: Commprop;
}

interface EditableCellProps {
  editing: any;
  dataIndex: any;
  title: any;
  inputType: any;
  record: any;
  index: any;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const CMPForm: React.FC<commFormProps> = (props) => {
  const { fetchUrl, commprop } = props;
  const { compForm } = commprop;
  const [form] = Form.useForm();
  //const [data, setData] = useState(compForm);
  const [data, setData] = useState(compForm?.data);
  const [editingKey, setEditingKey] = useState('');
  const [editableState] = useState(true);

  useEffect(() => {
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: fetchUrl,
      });
    }
  }, []);

  useEffect(() => {
    setData(compForm.data);
  }, [compForm]);

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({
      facility: '',
      status: '',
      desc: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: any) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Facility',
      dataIndex: 'facility',
      width: '25%',
      editable: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      editable: editableState,
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      width: '40%',
      editable: editableState,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      visible: editableState,
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;" // eslint-disable-line
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <a onClick = {() =>cancel()}> Cancel </a>
            
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data || []}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default connect(({ commprop }: ConnectState) => ({
  commprop,
}))(CMPForm);
*/
