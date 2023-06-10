console.log("estamos aca")

const form = document.querySelector("#login")
form.addEventListener("submit", (e) =>{
    e.preventDefault()

    const data = new FormData(form)
    console.log(data)
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
        console.log(respuesta.token)
        localStorage.setItem("token", respuesta.token)
        
    })
})

const getCookie = () => {
    console.log(document.cookie)
}

