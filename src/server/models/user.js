const Sequelize = require("sequelize");
const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(20),
          allowNull: true,
          validate: {
            validator: function (value) {
              return phoneValidationRegex.test(value);
            },
          },
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        // 모델 설정
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        timezone: "+09:00", // 한국 timezone
      }
    );
  }

  // 테이블 관계 설정
  static associate(db) {
    // 일대다 관계
    // db.User.hasMany(db.Signature);
    // 다대다 관계
    // db.User.belongsToMany(db.Document, {through: "UserDocument"});
  }
};

/* 일대다 관계
db.User.hasMany(db.Comment, {foreignKey: "commenter", sourceKey: "id", [옵션 추가 가능]});
db.Comment.belongsTo(db.User, {foreignKey: "commenter", sourceKey: "id", [옵션 추가 가능]});
hasMany 일대다 관계의 일
belongsTo 일대다 관계의 다
foreignKey는 다의컬럼 / sourceKey는 일의 컬럼

일대일 관계
db.User.hasOne(db.Info, {foreignKey: 'UserId', sourceKey: 'id'})
db.Info.belongsTo(db.User, {foreignKey: 'UserId', targetKey: 'id'})
belongsTo의 foreignKey는 들어갈 컬럼의 이름을 뜻한다.

다대다 관계 (중간 테이블이 생겨야함)
db.Post.belongsToMany(db.Hashtag, {throgh: 'PostHashtag'})
db.Hashtag.belongsToMany(db.Post, {throgh: 'PostHashtag'})
*/
