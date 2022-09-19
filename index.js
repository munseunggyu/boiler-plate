const express = require('express')  // 모듈 가져오기
const app = express()             // express 앱 생성
const port = 5500
const { User } = require('./models/User')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/key')
const cookieParser = require('cookie-parser')
// url 분석
app.use(bodyParser.urlencoded({extended: true}))

// Json 분석
app.use(bodyParser.json())

// cookie-parser
app.use(cookieParser())

mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err)) //mongoosedb

app.get('/',(req,res)=>{ res.send('Hello World! asdf')}) // '/'디렉토리에 오면 Hello World 출력

app.post('/register',(req,res) => {  //회원가입 
  const user = new User(req.body)
  user.save((err,userInfo) => {
    if(err) return res.json({succes:false,err})
    return res.status(200).json({
      succes: true
    })
  })
})

app.post('/login',(req,res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({email: req.body.email}, (err,user) =>{ // findOne mongodb 에서 제공해주는 함수이다
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청딘 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
    user.comparePassword(req.body.password,(err,isMatch) => {
      if(!isMatch) return res.json({loginSuccess:false, Message: '비밀번호가 틀렸습니다.'})

      // 비밀번호가 맞으면 토큰생성한다.
      user.generateToken((err,user) => {
        if(err) return res.status(400).send(err)
        // 토큰을 저장한다. 쿠키 또는 로컬스토리지등등
        res.cookie('x_auth',user.token)
        .status(200)
        .json({loginSuccess:true,userId:user._id})

      })
    })
  })
})

app.listen(port,() => {console.log(`Example app listening on port${port}`)})  // Port에서 실행

