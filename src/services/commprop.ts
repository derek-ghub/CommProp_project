import request from '@/utils/request';

export async function queryTable(): Promise<any> {
  return request(`/api/mock/table`);
}

export async function queryAmenities(): Promise<any> {
  return request(`/api/mock/amenities`);
}

export type TableDataType = {
  // update table with batch data. But status is String
  userid: any,
  requestIds: any,
  description: any,
  status: String,
};

export async function updateTable(data: TableDataType){

  return request('/api/mock/table', {
    method: 'POST',
    data: data,
  });
}


export type AmenityType = {
  amenityId: any,
  facility: String,
  status: String,
  description: String,
};

export async function updateAmenity(): Promise<any>{
  return request(`/api/mock/request/bookAmenities`);
}

  
export async function requestDatabase(param: any): Promise<any> {
  const { requestType, data, origin, currentUser } = param;
  return request(`/api/mock/request/${requestType}`, {
    method: 'POST',
    data: { data, origin, currentUser },
  });
}
