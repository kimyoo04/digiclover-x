const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const User = require("./user.js");
const Document = require("./document.js");
const Signature = require("./signature.js");

// 시퀄라이즈 설정
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    logging: false,
  }
);

// 데이터베이스 연결
db.sequelize = sequelize;

db.User = User;
db.Document = Document;
db.Signature = Signature;

//model과 mysql 연결
User.init(sequelize);
Document.init(sequelize);
Signature.init(sequelize);

// --------------------------------------------------------
User.associate(db);
// --------------------------------------------------------
Document.associate(db);
// --------------------------------------------------------
Signature.associate(db);

module.exports = db;

/*
SELECT 문
User.findOne({});
User.findAll({});
User.findAll({
  attributes: ['컬럼명1', '컬럼명2'],
});

------------------------------------------------
WHERE 문
연산자
const { Op } = require("sequelize");
User.findAll({
  attributes: ['컬럼명1', 컬럼명2'],
  where: {
    [Op.or]: [{married: 0}, {age: [Op.gt]: 30}],
  },
});


ORDER BY
2차원 배열
order: [['age', 'DESC']]

group By

LIMIT
limit: 1,

OFFSET
offset: 1,
------------------------------------------------
INSERT 문
User.create({
  컬럼명1 : 깂,
  컬럼명2 : 값,
  컬럼명3 : 값,
});

------------------------------------------------
UPDATE 문
User.update({
  comement: '바꿀 내용',
}, {
  where: {id: 2},
});

------------------------------------------------
DELETE 문
User.destroy({
  where: {id: {[Op.in]: 1,2,5}},
});

------------------------------------------------
Join 기능
const user = await User.findOne({
  include: [{
    model: Comment,
  }]
});

Join 기능을... get+컬럼명(모델명)을 테이블명의 메소드로 사용하면 관계가 있는 데이터 로딩 가능
const user = await User.findOne({});
const comments = await user.getComments();
console.log(comments);

------------------------------------------------
as 별칭 기능
db.User.hasMany(db.Comment, {foreignKey: 'commneter', sourceKey: 'id', as: 'Answers'});

------------------------------------------------
생성 쿼리... add+컬럼명
const user = await User.findone({}); //유저 한명 찾기
const comment1 = await Comment.create(); // 먼저 커맨트 로우 생성 후
const comment2 = await Comment.create(); // 먼저 커맨트 로우 생성 후
await user.addComment(comment1) // 커멘트와 유저를 연결
await user.addComment([comment1, comment2]) // 배열로 여러개의 커멘트를 연결

------------------------------------------------
수정은 set+모델명, 삭제는 remove+모델명

------------------------------------------------
직접 SQL 작성법
const [result, metadata] = await sequelize.query('SELECT * from comments');
console.log(result);

*/
