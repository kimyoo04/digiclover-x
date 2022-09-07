const Sequelize = require("sequelize");

module.exports = class Document extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        docuName: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: "Untitled",
        },
        docukindName: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        hashFile: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        // 모델 설정
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Document",
        tableName: "documents",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        timezone: "+09:00", // 한국 timezone
      }
    );
  }

  // 테이블 관계 설정
  static associate(db) {
    // 참조키 주기
    Document.hasOne(db.Signature);
  }
};
