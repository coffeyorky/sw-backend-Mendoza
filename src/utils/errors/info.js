exports.generateUserErrorInfo =(user) => {
    return `Una o mas propiedades estan incompletas, no es valido.
    lista de propiedades requeridas:
    first_name: necesita ser string, y se recibio ${user.first_name}
    last_name: necesita ser string, y se recibio ${user.last_name}
    email: necesita ser string, y se recibio ${user.email}`
}