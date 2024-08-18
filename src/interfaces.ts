export interface ICompany {
  id: number,
  ownerId: number,
  imageKey: string,
  imageUrl: string,
  description: string,
  name: string,
  isDeleted: boolean,
  approved: boolean,
  address: string,
  city: string,
}

export interface IEntertainmentDate {
  id: number,
  eventId: number,
  startDate: string,
  endDate: string,
}

export interface IEntertainment {
  name: string,
  imageKey: string,
  imageUrl: string,
  companyId: number,
  typeId: number,
  limitUsers: number,
  price: number,
  isDeleted: boolean,
  id: number,
  address: string,
  description: string,
  city: string,
  startDate: string,
  dates: IEntertainmentDate[]
}

export interface IEntertainmentType {
  id: number,
  imageKey: string,
  type: string,
  description: string,
}

interface LoginData {
  password: string,
  confirmPassword: string,
}

export interface IProfile extends LoginData{
  id?: number,
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: string,
  role?: string,
  companyId?: number,
}

export interface IEntertainmentRequest {
  id: number,
  eventId: number,
  userId: number,
  eventDateId: number,
  numberPeople: number,
  approved: boolean
}

export interface I {
  entertainments: {
    error?: string,
    eventInfo?: {},
    eventRequests?: [],
    eventTypes: IEntertainment[] | []
  }
}

export interface IEntertainmentGroups {
  1: IEntertainment[],
  2: IEntertainment[],
  3: IEntertainment[],
  4: IEntertainment[],
  5: IEntertainment[],
  6: IEntertainment[],
  7: IEntertainment[],
  8: IEntertainment[],
  9: IEntertainment[],
  10: IEntertainment[],
  11: IEntertainment[],
  12: IEntertainment[],
}
