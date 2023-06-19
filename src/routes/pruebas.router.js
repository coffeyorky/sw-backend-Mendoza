const { Router } = require("express");
const passport = require("passport");
const { passportCall } = require("../passport-jwt/passportcall");
const { authorization } = require("../passport-jwt/authorization.middleware");
const { fork } = require('child_process')

const router = Router();

// router.get(
//   "/current",
//   passportCall("jwt"),
//   authorization("user"),
//   (req, res) => {
//     res.send(req.user);
//   }
// );

// let words = [ 'Ani', 'hunter', 'fisto', 'fett'] 
// router.param('word', async (req, res, next, word)=>{
//     let searchWord = words.find(w => w === word)
//     if (!searchWord) {
//         req.word = null
//     }else{
//         req.word = searchWord        
//     }
//     next()
// })

// router.get("/:word([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)", async (req, res) => {
//     const { word } = req.params
//     res.send({
//         word
//     })
// })

// router.get('*', async (req,res)=>{
//   res.status(404).send('Ruta no encontrada')
// })

//childProcess

const operacionCompleja = (params) => {
  let result = 0
  for (let i = 0; i < 10e9; i++) {
      result += 1
      
  }
  return result
} 

router.get('/complejaBlock', (req,res) => {
  const result = operacionCompleja()
  res.send(`<center><h1>El resultado es ${result}</h1></center>`)
})

router.get('/compNoBlock', (req,res) => {
  const child = fork('./src/utils/operacionC.js')
  child.send('inicia el cáclulo por favor')
  child.on('message', result => {        
      res.send(`<center><h1>El resultado es ${result}</h1></center>`)
  })
})


module.exports = router;
