import {Http} from '@/plugins/http';

// 作业列表
export const worksList = (data) => Http.post('/detail', data);
