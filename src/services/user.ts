import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  const type = JSON.parse(localStorage.getItem('antd-pro-authority') || '');
  return request(`/api/currentUser/${type[0]}`);
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
