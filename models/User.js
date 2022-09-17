const mongoose = require('mongoose')

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
  passwoard:{
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

const User = mongoose.model('User',userSchema)  // 스키마를 모델로 감싸줌

module.exports = {User}   // 다른 파일에서 사용 가능하게 해준다