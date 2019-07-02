import {Http} from '@/plugins/http';

// 作业列表
export const pkDetail = (data) => Http.post('/detail', data);
