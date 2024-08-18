import {
  ICompany,
  IEntertainment,
  IEntertainmentRequest,
  IEntertainmentType,
  IProfile,
} from 'src/interfaces';

export interface IAdminStore {
  companiesList: ICompany[] | [],
  entertainments: IEntertainment[] | [],
  usersList: IProfile[] | [],
}

export interface IAuthStore {
  token: string,
  isLogin: boolean,
}
export interface ICompanyStore {
  companiesList: ICompany[] | [],
  companyEntertainments: IEntertainment[] | [],
}
export interface IEntertainmentsStore {
  eventTypes: IEntertainmentType[] | [],
  eventRequests: IEntertainmentRequest[] | [],
  eventInfo: IEntertainment | [],
  error: any | string,
}

export type IUserStore = IProfile

export interface IStore {
  admin: IAdminStore,
  auth: IAuthStore,
  company: ICompanyStore,
  entertainments: IEntertainmentsStore,
  user: IUserStore,
}
