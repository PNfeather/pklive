import Mock from 'mockjs'; // 引入mockjs

let baseUrl = process.env.BASE_URL;

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

let data = []; // 用于接受生成数据的数组
let dataNum = Random.integer(12, 14);
for (let i = 0; i < dataNum; i++) { // 可自定义生成的个数
  let template = {
    'pkPlayerList': [{
      'studentCode': '578603536418344960',
      'studentName': Random.cname(),
      'studentMacAddress': '7C4685BFD131',
      'gender': 'FEMALE',
      'pkVictoryRate': 33,
      'pkVictoryNumber': 1,
      'pkFailNumber': 1,
      'pkDrawNumber': 1,
      'pkResult': 'PK_RESULT_VICTORY',
      'pkRank': 1,
      'pkStatus': 'PK_STATUS_ANSWERRING'
    }, {
      'studentCode': '578603536036663296',
      'studentName': Random.cname(),
      'studentMacAddress': '7C4685BF9316',
      'pkFailNumber': 1,
      'pkDrawNumber': 2,
      'pkResult': 'PK_RESULT_DRAW',
      'pkRank': 2,
      'pkStatus': 'PK_STATUS_SUBMITTED'
    }]
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
