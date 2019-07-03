import {Http} from '@/plugins/http';

// pk详情
export const pkDetail = () => Http.get('/detail');
// 完成率
export const pkFinishedPre = () => Http.get('/pkFinishedPre');
// 主观题表格
export const subjectiveTable = () => Http.get('/subjectiveTable');
// 主观题图表
export const subjectiveChart = () => Http.get('/subjectiveChart');
