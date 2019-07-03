import Mock from 'mockjs'; // 引入mockjs

let baseUrl = process.env.BASE_URL;

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

let data = []; // 用于接受生成数据的数组
let dataNum = Random.integer(32, 40);
for (let i = 0; i < dataNum; i++) { // 可自定义生成的个数
  let template = {
    'name1': Random.cname(),
    'name2': Random.cname()
  };
  data.push(template);
}

Mock.mock(baseUrl + '/detail', 'get', () => {
  return {
    'code': 0,
    'data': data,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
