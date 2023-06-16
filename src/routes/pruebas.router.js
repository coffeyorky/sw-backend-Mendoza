const { Router } = require("express");
const passport = require("passport");
const { passportCall } = require("../passport-jwt/passportcall");
const { authorization } = require("../passport-jwt/authorization.middleware");

const router = Router();

router.get(
  "/current",
  passportCall("jwt"),
  authorization("user"),
  (req, res) => {
    res.send(req.user);
  }
);

let words = [ 'Ani', 'hunter', 'fisto', 'fett'] 
router.param('word', async (req, res, next, word)=>{
    let searchWord = words.find(w => w === word)
    if (!searchWord) {
        req.word = null
    }else{
        req.word = searchWord        
    }
    next()
})

router.get("/:word([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)", async (req, res) => {
    const { word } = req.params
    res.send({
        word
    })
})

router.get('*', async (req,res)=>{
  res.status(404).send('Ruta no encontrada')
})


module.exports = router;
