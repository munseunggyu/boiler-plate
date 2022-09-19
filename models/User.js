const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
// salt를 이용해서 비밀번호 암호화
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name:{
    type:String,
    maxlength:50
  },
  email:{
    type:String,
    trim: true,
    unique:1
  },
  password:{
    type:String,
    minlength:5
  },
  lastname:{
    type:String,
    maxlength:50
  },
  role:{      // 관리자 설정 1이면 관리자 0이면 사용자
    type:Number,
    default:0
  },
  image:String,
  token:{
    type:String
  },
  tokenExp:{    // 토큰의 유효기간
    type:Number
  }
})
userSchema.pre('save',function (next){ //user정보 저장전 실행된다
  const user = this // UserSchema 를 가르킨다
  if(user.isModified('password')){  // password만 변화될때 실행
    bcrypt.genSalt(saltRounds,function(err,salt){ //salt 생성
      if(err) return next(err)
      bcrypt.hash(user.password,salt,function(err,hash){ //hash생성
        if(err) return next(err)
        user.password = hash  
        next()
      })
    })
  }else{
    next()  // password를 바꾸는게 아니면 실행
  }
})

userSchema.methods.comparePassword = function(plainPassword,cb){
  // db의 password와 사용자가 보낸 password를 맞춰본다.
  bcrypt.compare(plainPassword,this.password,function(err,isMatch){
    if(err) return cb(err)
    cb(null,isMatch)
  })
}

userSchema.methods.generateToken = function(cb){
  let user =this

  //jsonwebToken 이용하여 토큰 생성
  const token = jwt.sign(user._id.toHexString(),'secretToken') 
  // user id 와 secretToken 을 합쳐 token 생성
  
  user.token = token
  user.save(function(err,user){
    if(err) return cb(err)
    cb(null,user)
  })
}

const User = mongoose.model('User',userSchema)  // 스키마를 모델로 감싸줌

module.exports = {User}   // 다른 파일에서 사용 가능하게 해준다