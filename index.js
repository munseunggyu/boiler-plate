const express = require('express')  // 모듈 가져오기
const app = express()             // express 앱 생성
const port = 5500

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://msg:opCSUFdyT5kVIfXp@cluster0.w1uup9m.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('MongoDB Connected...')).catch(err => console.log(err)) //mongoosedb

app.get('/',(req,res)=>{ res.send('Hello World!')}) // '/'디렉토리에 오면 Hello World 출력

app.listen(port,() => {console.log(`Example app listening on port${port}`)})  // Port에서 실행

