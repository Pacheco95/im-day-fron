import axios from 'axios';
import { UserDto } from '../dto/UserDto';

const api = axios.create({
  baseURL: 'https://im-day-api.herokuapp.com',
});

export type MaybeUser = UserDto | null;

export interface ScheduleService {
  getRecentScheduledUsers: () => Promise<MaybeUser[]>;
}

const service: ScheduleService = {
  getRecentScheduledUsers() {
    return api.get<MaybeUser[]>('im-day').then(({ data }) => data);
  },
};

export default service;
