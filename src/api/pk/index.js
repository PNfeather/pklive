import {Http} from '@/plugins/http';

// pk详情
export const pkDetail = () => Http.get('/detail');
// 完成率
export const pkFinishedPre = () => Http.get('/pkFinishedPre');
