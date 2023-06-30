const { logger } = require("../../utils/logger")

logger.info("estamos aca")

const form = document.querySelector("#login")
form.addEventListener("submit", (e) =>{
    e.preventDefault()

    const data = new FormData(form)
    logger.info(data)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)

    fetch("http://localhost:8080/session/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(respuesta => {
        return respuesta.json()
    })
    .then(respuesta => {
        logger.info(respuesta.token)
        localStorage.setItem("token", respuesta.token)
        
    })
})

const getCookie = () => {
    logger.info(document.cookie)
}

