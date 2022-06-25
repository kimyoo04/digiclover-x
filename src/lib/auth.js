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

  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send("로그인 필요");
    }
  },

  isNotLoggedIn: (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      const message = encodeURIComponent("로그인한 상태입니다.");
      res.redirect(`/?error=${message}`);
    }
  },
};
