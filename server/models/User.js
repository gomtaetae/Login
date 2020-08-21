const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  //이메일 인증
  isVerified: {
    type: Boolean,
    default: false,
  },
});


userSchema.pre("save", function (next) {
  var user = this;
  console.log("pre에 들어왔어요");
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.pre("updateOne", function (next) {
  let user = this; //arrow function 대신 function을 사용한 이유
  console.log("updateOne pre에 들어왔어요");
  console.log("user.js", user._update.password);
  if (user._update.password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      console.log("genSalt에 들어왔어요");
      if (err) return next(err);
      bcrypt.hash(user._update.password, salt, function (err, hash) {
        if (err) return next(err);
        user._update.password = hash;
        console.log(hash);
        next();
      });
    });
  } else {
    next();
  }
});


userSchema.methods.comparePassword = function (plainPassword, cb) {
  console.log("2번 client 입력 : ", plainPassword);
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    console.log("3번", isMatch);
    if (err) return cb(err);
    cb(null, isMatch); 
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this; 
  console.log("5번 user._id: ", user._id);
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  console.log("6번 유저토큰: ", user.token);
  console.log("7번 토큰: ", token);
  user.save(function (err, user) {
    console.log("8번 user정보: ", user._id);
    if (err) return cb(err); 
    cb(null, user); 
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, "secretToken", function (err, decoded) {
    console.log("1번 models_user._id decoded", decoded);
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };


