const Sequelize = require("sequelize");

module.exports = class Signature extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        contractorPhone: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        isSigned: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        hashValue: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        imgUrl: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        DocumentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        // 모델 설정
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Signature",
        tableName: "signatures",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        timezone: "+09:00", // 한국 timezone
      }
    );
  }

  // 테이블 관계 설정
  static associate(db) {
    // 참조키 받기
    Signature.belongsTo(db.Document);
  }
};
