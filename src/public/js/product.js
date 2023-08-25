// const { logger } = require("../../utils/logger")

// logger.info("estamos aca")

// const form = document.querySelector("#product")
// form.addEventListener("submit", (e) =>{
//     e.preventDefault()

//     const data = new FormData(form)
//     logger.info(data)
//     const obj = {}
//     data.forEach((value, key) => obj[key] = value)

//     fetch("http://localhost:8080/api/producto", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(obj)
//     })
//     .then(respuesta => {
//         return respuesta.json()
//     })
//     .then(respuesta => {
//         logger.info(respuesta.token)
//         localStorage.setItem("token", respuesta.token)
        
//     })
// })