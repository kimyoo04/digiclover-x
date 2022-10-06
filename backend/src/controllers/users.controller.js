import usersDAO from "../dao/usersDAO";

module.exports = class UsersCtrl {
  //--------------------------------------------------------------------------------
  // Get - 회원조회
  //--------------------------------------------------------------------------------
  static async apiGetOneUserById(req, res, next) {
    const id = req.id;

    const response = await usersDAO.getOneUserById(id);

    console.log("apiGetUserbyId - 성공");
    return res.status(200).json(response);
  }

  //--------------------------------------------------------------------------------
  // Delete - 회원탈퇴
  //--------------------------------------------------------------------------------
  static async apiDeleteOneUserById(req, res, next) {
    const id = req.id;

    await usersDAO.deleteOneUserById(id);

    console.log("apiDeleteUserById - 성공");
    return res.status(200).json({msg: "apiDeleteUserById - 성공"});
  }

  //--------------------------------------------------------------------------------
  // Put - 회원정보수정
  //--------------------------------------------------------------------------------
  static async apiPutOneUserById(req, res, next) {
    const id = req.id;

    const {email, company, name, phone} = req.body.data;

    await usersDAO.putOneUserById(id, email, company, name, phone);

    console.log("apiPutUserById - 성공");
    return res.status(200).json({msg: "apiPutUserById - 성공"});
  }
};
