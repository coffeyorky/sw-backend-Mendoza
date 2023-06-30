// const suma = (numero1, numero2) => {
//     if(!numero1 || !numero2) return 0
//     if(typeof (numero1) !== "number" || typeof numero2 !== "number") return null
//     return numero1 + numero2
// }

const { logger } = require("../src/utils/logger")

// const suma = (...numeros) => {
//     if(numeros.length===0) return 0
//     let validInput = true
//     for(let i = 0; i < numeros.length && validInput; i++) {
//         if(typeof numeros [i] !== "number"){
//             validInput = false
//         }
//     }
//     if(!validInput) return null
//     let result = 0
//     for(let i = 0; i < numeros.length; i++) {
//         result += numeros[i]
//     }
// }
const suma = (...numeros) => {
    if(numeros.length===0) return 0
    if(!numeros.every(num=> typeof num==="number")) return null
    return numeros.reduce((total, num) => total += num ,0)
}

let testPasados = 0
const TestTotales = 4

logger.info("debe devolver null si un parametro no es numerico")

let resultTest = suma("2", 2)
if(resultTest === null) {
    logger.info("test 1 pesado")
    testPasados++
} else logger.info(`Test 1 no pasado se recibio ${typeof resultTest}, pero se esperaba null`)

logger.info("la funcion debe devolver 0 sino paso parametros () 0")
let resultTest2 = suma()
if(resultTest2 === 0 ) {
    logger.info("test 2 paso")
    testPasados++
} else logger.info(`Test 2 no pasado se recibio ${resultTest2}, pero se esperaba 0`)

let resultTest3 = suma(2,3)
if(resultTest3 === 5 ) {
    logger.info("test 3 paso")
    testPasados++
} else logger.info(`Test 3 no pasado se recibio ${resultTest3}, pero se esperaba 5`)

let resultTest4 = suma(1,2,3,4,5)
if(resultTest4 === 15 ) {
    logger.info("test 4 paso")
    testPasados++
} else logger.info(`Test 4 no pasado se recibio ${resultTest4}, pero se esperaba 5`)


logger.info(`Paso ${testPasados} de ${TestTotales} test de pruebas`)
