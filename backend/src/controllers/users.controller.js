import usersDAO from "../dao/usersDAO";

module.exports = class UsersCtrl {
  // Get - 회원조회

  static async apiGetUserById(req, res, next) {
    let {id} = req.params;
    // id 디시리얼라이즈 하기

    // id 인수 함수 안에서 복호화 후 id 값을 검색한다고 가정
    const response = await usersDAO.getUserById(id);

    console.log("apiGetUserbyId - success");
    return res.json(response);
  }

  // Delete - 회원탈퇴

  static async apiDeleteUserById(req, res, next) {
    let {id} = req.params;
    // id 디시리얼라이즈 하기

    await usersDAO.deleteUserById(id);

    console.log("apiDeleteUserById - success");
    return res.json({result: "success"});
  }

  // Put - 회원정보수정

  static async apiPutUserById(req, res, next) {
    const {id} = req.params;
    // id 디시리얼라이즈 하기

    const {email, company, name, phone} = req.body.data;

    await usersDAO.putUserById(id, email, company, name, phone);

    console.log("apiPutUserById - success");
    return res.json({result: "success"});
  }
};
