import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
};

export type RegisterParamsType = {
  userName: string;
  password: string;
  type: string;
  role: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export async function AccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function AccountRegister(params: RegisterParamsType) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}
