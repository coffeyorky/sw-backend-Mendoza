const chai = require("chai");
const UserDto = require("../src/dto/user.dto.js");
const { createHash, isValidPassword } = require("../src/utils/brcyptPass.js");

const expect = chai.expect;

describe("Testing Bcrypt", () => {
  it("el servidor debe devolver un hasheo efectivo para el pass", async function () {
    const password = "star";
    const hashedPassword = await createHash(password);
    expect(hashedPassword).to.not.equal(password);
  });
  it("si el pass se altera debe fallar la comparacion con el original", async function () {
    const password = "star";
    let hashedPassword = await createHash(password);

    const isValid = await isValidPassword(
      { password: hashedPassword },
      password
    );
    expect(isValid).to.be.true;
  });
  it("si el pass se altera debe fallar la comparacion con el original", async function () {
    const password = "star";
    let hashedPassword = await createHash(password);
    hashedPassword += "+";

    const isValid = await isValidPassword(
      { password: hashedPassword },
      password
    );
    expect(isValid).to.be.false;
  });
});

describe("Testis UseDto", () => {
  before(function () {
    this.userDto = UserDto;
  });
  it("El DTO debe unificar el nombre y el apellido en una unica propiedad llamada name", () => {
    const mockUser = {
      first_name: "Bode",
      last_name: "Akuna",
      email: "kate@kate",
      role: "user",
    };
    const userDtoToken = UserDto.getUserTokenFrom(mockUser);
    expect(userDtoToken).to.have.property("name", "Bode Akuna");
  });
  it("El DTO debe eliminar las propiedades innecesarias", () => {
    const mockUser = {
      first_name: "Bode",
      last_name: "Akuna",
      email: "kate@kate",
      role: "user",
      password: "bode"
    };
    const userToken = UserDto.getUserTokenFrom(mockUser);

    expect(userToken).to.not.have.property("first_name")
    expect(userToken).to.not.have.property("last_name")
    expect(userToken).to.not.have.property("password")
  });
});
