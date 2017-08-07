// 학생 정보를 다루는 서비스를 정의한다.
const net = require('net')
const express = require('express')
const datasource = require('../util/datasource')
const studentDao = require('../dao/student-dao')
const memberDao = require('../dao/member-dao')
const studentService = require('../service/student-service')

const connection = datasource.getConnection()
studentDao.setConnection(connection)
memberDao.setConnection(connection)
studentService.setStudentDao(studentDao)
studentService.setMemberDao(memberDao)

const router = express.Router()

//
router.post('/send.json', function(request, response) {
    console.log('포스트 요청 들어옴')
})

router.ws('/send.json', function(ws, req) {
  console.log('router.ws 콜백함수 실행됨')
  ws.on('message', function(msg) {
    ws.send('서버에서 보냈어!' + msg);
    console.log('ws.on() 콜백 함수 실행')
  });
});

//app.use("/ws-stuff", router);


module.exports = router

// router.get('/list.json', (request, response) => {
//   var pageNo = 1,
//       pageSize = 3;
//   if (request.query.pageNo) {
//     pageNo = parseInt(request.query.pageNo)
//   }
//   if (request.query.pageSize) {
//     pageSize = parseInt(request.query.pageSize)
//   }
//   studentService.list(pageNo, pageSize, function(results, totalCount) {
//     response.json({'list': results, 'totalCount': totalCount})
//   }, function(error) {
//     response.status(200)
//             .set('Content-Type', 'text/plain;charset=UTF-8')
//             .end('error')
//     console.log(error)
//   })
// })
//
// router.get('/detail.json', function(request, response) {
//   var no = parseInt(request.query.no)
//   studentService.detail(no, function(result) {
//     response.json(result)
//
//   }, function(error) {
//     response.status(200)
//             .set('Content-Type', 'text/plain;charset=UTF-8')
//             .end('error')
//     console.log(error)
//   })
// })
//
// router.post('/update.json', function(request, response) {
//   studentService.update({
//     no: request.body.no,
//     working: request.body.working,
//     schoolName: request.body.schoolName,
//     name: request.body.name,
//     tel: request.body.tel,
//     email: request.body.email,
//     password: '1111'
//   }, function(result) {
//     response.json({'result': 'yes'})
//
//   }, function(error) {
//     response.status(200)
//             .set('Content-Type', 'text/plain;charset=UTF-8')
//             .end('error')
//     console.log(error)
//   })
// })
//
// router.get('/delete.json', function(request, response) {
//   var no = parseInt(request.query.no)
//   studentService.delete(no, function(result) {
//     response.json({'result': 'yes'})
//
//   }, function(error) {
//     response.status(200)
//             .set('Content-Type', 'text/plain;charset=UTF-8')
//             .end('error')
//     console.log(error)
//   })
// })
//
// router.post('/add.json', function(request, response) {
//   studentService.insert({
//     working: request.body.working,
//     schoolName: request.body.schoolName,
//     name: request.body.name,
//     tel: request.body.tel,
//     email: request.body.email,
//     password: '1111'
//   }, function(result) {
//     response.json({'result': 'yes'})
//
//   }, function(error) {
//     response.status(200)
//             .set('Content-Type', 'text/plain;charset=UTF-8')
//             .end('error')
//     console.log(error)
//   })
// })
