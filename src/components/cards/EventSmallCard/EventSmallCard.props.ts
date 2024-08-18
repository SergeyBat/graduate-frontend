import {IEntertainment, IEntertainmentType} from 'src/interfaces';

export interface EventSmallCardProps {
  withoutTitle?: boolean;
  event: IEntertainment;
  eventTypes: IEntertainmentType[];
}
