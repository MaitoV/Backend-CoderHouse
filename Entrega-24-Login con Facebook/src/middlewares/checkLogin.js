const isLoggedIn = (req, res, done) => {
    if(!req.isAuthenticated()) 
    return res.render('login');
  
    done();
  };

  module.exports = isLoggedIn;