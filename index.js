const express = require('express')  // 모듈 가져오기
const app = express()             // express 앱 생성
const port = 5500
const { User } = require('./models/User')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/key')
// url 분석
app.use(bodyParser.urlencoded({extended: true}))

// Json 분석
app.use(bodyParser.json())

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

app.listen(port,() => {console.log(`Example app listening on port${port}`)})  // Port에서 실행

