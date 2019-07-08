import Mock from 'mockjs'; // 引入mockjs

let baseUrl = process.env.BASE_URL;

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

let data = [{ // 用于接受生成数据的数组
  'name': '掌握不牢',
  'count': Random.integer(1, 20),
  'color': '#5C97FF'
}, {
  'name': '粗心大意',
  'count': Random.integer(1, 20),
  'color': '#8FDA45'
}, {
  'name': '其他原因',
  'count': Random.integer(1, 20),
  'color': '#FFC04F'
}, {
  'name': '错误理解',
  'count': Random.integer(1, 20),
  'color': '#FE8989'
}];

Mock.mock(baseUrl + '/subjectiveChart', 'get', () => {
  return {
    'code': 0,
    'data': data,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
