const { faker } = require("@faker-js/faker")

faker.locale="es"

const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        departament: faker.commerce.department(),
        stock: faker.random.numeric(1),
        id: faker.database.mongodbObjectId(),
        image: faker.image.image(),
    }
}

exports.generateUser = () => {
    let numOfProducts = parseInt(faker.random.numeric(1, {bannnedDigits: ["0"]}))
    let products = []
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProducts())
    }
    return {
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        sex: faker.name.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        products,
        image: faker.internet.avatar(),
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email()
    }
}