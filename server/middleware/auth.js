const { User } = require('../models/User')


let auth = (req, res, next) => {
  console.log(req.cookies)
  console.log("0번 클라이언트에 있는 토큰: ",req.cookies.x_auth)
  let token = req.cookies.x_auth;
  User.findByToken(token, (err,user)=> {
    if(err) throw err;
    if(!user) return res.json({ isAuth: false, error: true, isVerified : false})
    req.token = token;
    req.user = user;
    next()
  })
}

module.exports = { auth }
