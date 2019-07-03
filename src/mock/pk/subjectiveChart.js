import Mock from 'mockjs'; // 引入mockjs

let baseUrl = process.env.BASE_URL;

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

let data = []; // 用于接受生成数据的数组
data.push({
  value: Random.integer(1, 20),
  name: '其他原因'
});
data.push({
  value: Random.integer(1, 20),
  name: '粗心大意'
});
data.push({
  value: Random.integer(1, 20),
  name: '掌握不劳'
});
data.push({
  value: Random.integer(1, 20),
  name: '错误理解'
});
Mock.mock(baseUrl + '/subjectiveChart', 'get', () => {
  return {
    'code': 0,
    'data': data,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
