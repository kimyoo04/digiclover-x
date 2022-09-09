module.exports = {
  isOwner: function (req, res) {
    if (req.user) {
      return true;
    } else {
      return false;
    }
  },

  statusUI: function (req, res) {
    let authStatusUI = '<a href="/auth/login">login</a>';
    // 로그인 확인
    if (this.isOwner(req, res)) {
      authStatusUI = `${req.user.nickname} | <a href="/auth/logout">logout</a>`;
    }
    return authStatusUI;
  },

  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      const message = "------------- 로그인 없이 접근 -------------";
      console.log(message);
      res.status(403).redirect(`/auth/require-login`);
    }
  },
};
