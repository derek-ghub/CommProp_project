import { Request, Response } from 'express';
import { random } from 'lodash';
import moment from 'moment';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let index = 0;
// mock tableListDataSource
const genList = (current: number, pageSize: number, type: String) => {
  const tableListDataSource: any[] = [];
  const services = ["Electrical Application","Bathroom","Balcony","Elevator","Air Condition"];
  let stats = [
    { info: 'Waiting to be approved by admin', color: 'blue', date: moment().format('YYYY-MM-DD')},
    { info: 'Admin approved, Waiting to be taken by maintainer', color: 'yellow', date: moment().add(2, 'days').format('YYYY-MM-DD HH:mm:ss')},
    { info: 'Taken by maintainer Jack, UserID 100340', color: 'yellow', date: moment().add(4, 'days').format('YYYY-MM-DD HH:mm:ss')},
    { info: 'Solving by maintainer Jack, UserID 100340', color: 'green', date: moment().add(10, 'days').format('YYYY-MM-DD HH:mm:ss') },
    { info: 'Cancelled by Admin: do not have suitable maintainer', color: 'red', date: moment().add(3, 'days').format('YYYY-MM-DD HH:mm:ss') },
  ];
  let status = [];
  if (type === "open"){
     status.push(stats[0]);
  }
  else if (type === "completed"){
    status.push(stats[0]);
    status.push(stats[1]);
    status.push(stats[2]);
    status.push(stats[3]);
  }
  else if (type === "pending"){
    status.push(stats[0]);
    status.push(stats[1]);
  }
  else if (type === "processing"){
    status.push(stats[0]);
    status.push(stats[1]);
    status.push(stats[2]);
  }
  else{
    status.push(stats[0]);
    status.push(stats[2]);
  }

  for (let i = 0; i < pageSize; i += 1) {
    index = (current - 1) * 10 + i;
    const userIndex = random(0, 3);
    
    tableListDataSource.push({
      key: index.toString(),
      requestId:  index.toString(),
      firstName: 'XXXX',
      lastName: 'XXXX',
      userid: `u00${userIndex}`,
      service: services[Math.floor(Math.random()*services.length)],
      date: status[status.length-1].date,
      description: 'description of service',
      status: status,
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let openDataSource = genList(50, 8, "open");
let pendingDataSource = genList(35, 8, "pending");
let processingDataSource = genList(29, 8, "processing");
// let cancelledDataSource = genList(20, 8, "cancelled");
let completedDataSource = genList(1, 8, "completed");

function current() {
  var d = new Date(),
    str = '';
  str += d.getFullYear() + '-';
  str += d.getMonth() + 1 + '-';
  str += d.getDate() + ' ';
  str += d.getHours() + ':';
  str += d.getMinutes() + ':';
  str += d.getSeconds();
  return str;
}

function changeStatus(data:any, oldStatus:any, newStatus:any, id:any){
  data[oldStatus].forEach((element:any, index: any) => {
      if (element.key === id){
        data[newStatus].push(element);
        data[oldStatus].splice(index,1);
        return ;
      }
  });
}

function contains(obj: any, arr: any) {
  let flag = false
  arr.forEach((o: any) => {
    if (obj.key === o.key) flag = true;
  })
  return flag;
}

function approvefilter(arr: any, data: any) {
  const resData = JSON.parse(JSON.stringify(arr));
  resData.open.forEach((o: any) => {
    if (contains(o, data)) arr.open.splice(o, 1);
  })
}

function cancellpendingfilter(arr: any, data: any) {
  const resData = JSON.parse(JSON.stringify(arr));
  resData.pending.forEach((o: any) => {
    if (contains(o, data)) arr.pending.splice(o, 1);
  })
}

function processingfilter(arr: any, data: any) {
  const resData = JSON.parse(JSON.stringify(arr));
  resData.processing.forEach((o: any) => {
    if (contains(o, data)) arr.processing.splice(o, 1);
  })
}

function pendingfilter(arr: any, data: any) {
  const resData = JSON.parse(JSON.stringify(arr));
  resData.pending.forEach((o: any) => {
    if (contains(o, data)) arr.pending.splice(o, 1);
  })
}

function changeDataStatus(data: any, type: any) {
  data.forEach((o: any) => {
    if (type === 'pending') o.status.push({ info: 'Admin approved, Waiting to be taken by maintainer', color: 'yellow', date: moment().add(2, 'days').format('YYYY-MM-DD HH:mm:ss')});
    if (type === 'adminCancell') o.status.push({ info: 'Admin cancelled, do not have suitable maintainer yet', color: 'red', date: moment().add(2, 'days').format('YYYY-MM-DD HH:mm:ss')});
    if (type === 'maintainerCancell') o.status.push({ info: 'Maintainer cancelled, this service can not be solved', color: 'red', date: moment().add(2, 'days').format('YYYY-MM-DD HH:mm:ss')});
    if (type === 'maintainerSolved') o.status.push({ info: 'Maintainer Jack has solved this service', color: 'green', date: moment().add(2, 'days').format('YYYY-MM-DD HH:mm:ss')});
    if (type === 'maintainerSelected') o.status.push({ info: 'Maintainer Jack has selected this service', color: 'yellow', date: moment().add(2, 'days').format('YYYY-MM-DD HH:mm:ss')});
  })
}

export default {
  'GET /api/mock/table': {
    data: {
      open: openDataSource,
      pending: pendingDataSource,
      processing: processingDataSource,
      // cancelled: cancelledDataSource,
      completed: completedDataSource,
    },
  },

  'GET /api/mock/amenities': {
    data: [
      {
        //amenityId
        key: '0',
        facility: 'Computers',
        status: '5',
        description: 'For print and scan purpose.',
        operation: '',
      },
      {
        key: '1',
        facility: 'Game Rooms',
        status: '5',
        description: '1 hour for each user',
        operation: '',
      },
      {
        key: '2',
        facility: 'Gym',
        status: 'open',
        description: 'Open hours: 6 am - 11:00 pm',
        operation: '',
      },
      {
        key: '3',
        facility: 'Pool',
        status: 'open',
        description: 'Open hours: 6 am - 11:00 pm; No more than 20 people.',
        operation: '',
      },
    ],
  },

  'GET /api/mock/request/bookAmenities': {
    data: [
      {
        key: '0',
        facility: 'Computers',
        status: '4',
        description: 'For print and scan purpose.',
        operation: '',
      },
      {
        key: '1',
        facility: 'Game Rooms',
        status: '5',
        description: '1 hour for each user',
        operation: '',
      },
      {
        key: '2',
        facility: 'Gym',
        status: 'open',
        description: 'Open hours: 6 am - 11:00 pm',
        operation: '',
      },
      {
        key: '3',
        facility: 'Pool',
        status: 'open',
        description: 'Open hours: 6 am - 11:00 pm; No more than 20 people.',
        operation: '',
      },
    ],
  },

  'POST /api/mock/request/addNewService': async (req: Request, res: Response) => {
    const { origin, data, currentUser } = req.body;
    const date = current();
    const id = index + 1; 
    const addData = {
      key: id.toString(),
      serviceID: id.toString(),
      service: data.service,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      date: date,
      description: data.description,
      status: [{ info: 'Waiting to be approved by admin', date: date }],
    };
    await waitTime(2000);
    origin.open.push(addData);
    res.send({ status: 'ok', data: origin });
  },

  'POST /api/mock/request/addNewAmenity': async (req: Request, res: Response) => {
    const { origin, data } = req.body;
    const addData = {
      description: data.description,
      facility: data.facility,
      key: data.facility,
      operation: '',
      status: data.status,
    };
    await waitTime(2000);
    origin.push(addData);
    res.send({ status: 'ok', data: origin });
  },

  'POST /api/mock/request/approveOpenService': async (req: Request, res: Response) => {
    const { origin, data } = req.body;
    approvefilter(origin, data);
    changeDataStatus(data, 'pending');
    origin.pending.push(...data);
    await waitTime(2000);
    res.send({ status: 'ok', data: origin });
  },

  'POST /api/mock/request/cancellPendingService/admin': async (req: Request, res: Response) => {
    const { origin, data } = req.body;
    cancellpendingfilter(origin, data);
    changeDataStatus(data, 'adminCancell');
    origin.completed.push(...data);
    await waitTime(2000);
    res.send({ status: 'ok', data: origin });
  },

  'POST /api/mock/request/cancellProcessingService/maintainer': async (req: Request, res: Response) => {
    const { origin, data } = req.body;
    processingfilter(origin, data);
    changeDataStatus(data, 'maintainerCancell');
    origin.completed.push(...data);
    await waitTime(2000);
    res.send({ status: 'ok', data: origin });
  },

  'POST /api/mock/request/solvedProcessingService/maintainer': async (req: Request, res: Response) => {
    const { origin, data } = req.body;
    processingfilter(origin, data);
    changeDataStatus(data, 'maintainerSolved');
    origin.completed.push(...data);
    await waitTime(2000);
    res.send({ status: 'ok', data: origin });
  },

  'POST /api/mock/request/selectedService/maintainer': async (req: Request, res: Response) => {
    const { origin, data } = req.body;
    pendingfilter(origin, data);
    changeDataStatus(data, 'maintainerSelected');
    origin.processing.push(...data);
    await waitTime(2000);
    res.send({ status: 'ok', data: origin });
  },

  // update Amenity status
  'POST /api/mock/request/updateAmenity': async (req: Request, res: Response) => {
    const { origin, data } = req.body;
    //const date = current();
    await waitTime(2000);
    console.log("in service")
    data.forEach((element:any) => {
      origin.forEach((ele: any) => {
        
        if (element.key === ele.key){
          //console.log(element, ele)
          ele.status = element.status;
          ele.description = element.description;
        }
      });
    });
    console.log(origin)
    res.send({ status: 'ok', data: origin });
  },
  //id: (Math.random() * 1000000).toFixed(0).toString(),
};
