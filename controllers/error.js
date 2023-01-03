exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found!",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  }); // we don't have to use ../ bcz we already are in app.js folder that is our root folder
};
exports.get500 = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  }); // we don't have to use ../ bcz we already are in app.js folder that is our root folder
};
