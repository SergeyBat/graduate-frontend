interface IStoreProps {
  companiesList(): void,
  entertainmentsList(): void,
  usersList(): void,
  changeUserRole(): void,
  changeCompany(): void,
}

export interface AdminContentProps extends IStoreProps {
  selectedTab: string,
}
