import { IEntertainment, IEntertainmentType } from 'src/interfaces';

export interface EventBigCardProps {
  withoutTitle?: boolean;
  event: IEntertainment;
  eventTypes: IEntertainmentType[];
  isInfo?: boolean,
}
