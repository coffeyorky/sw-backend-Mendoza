const chai = require("chai");
const supertest = require("supertest");

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing adoptame", () => {
  // describe("Test de productos", () => {
  //   it("El endpoint POST debe crear un producto correctamente", async () => {
  //     const prodMock = {
  //       title: "Remera Bad batch",
  //       category: "ropa",
  //       stock: "15",
  //     };
  //     const { statusCode, ok, _body } = await requester
  //       .post("/api/producto/prod")
  //       .send(prodMock);
  //     console.log(statusCode);
  //     console.log(ok);
  //     console.log(_body);
  //     expect(_body.payload).to.have.property("_id");
  //     //expect(_body.payload.adopted).to.equal(false);
  //   });
  //   it("El endpoint POST debe crear un producto correctamente", async () => {
  //     const prodMock = {
  //       // title: "Remera Bad batch",
  //       category: "ropa",
  //       stock: "15",
  //     };
  //     const { statusCode, ok, _body } = await requester
  //       .post("/api/producto/prod")
  //       .send(prodMock);
  //     console.log(statusCode);
  //     console.log(ok);
  //     console.log(_body);
  //     expect(statusCode).to.equal(400);
  //   });
  //   it("El metodo GET de productos debe obtener un array de productos, correctamente", async () => {
  //     const { statusCode, ok, _body } = await requester.get("/api/producto");
  //     expect(ok).to.be.equal(true);
  //   });
  // });

  // describe("Test avanzado Session", () => {
  //   let cookie;
  //   // it("Debe registrar un usuario correctamente", async () => {
  //   //   const userMock = {
  //   //     username: "bode akuna",
  //   //     first_name: "bode",
  //   //     last_name: "akuna",
  //   //     password: "bode",
  //   //     email: "bode@cal",
  //   //   };
  //   //   const { _body } = await requester.post("/session/register").send(userMock);
  //   //   console.log(_body)
  //   //   expect(_body.payload).to.be.ok;
  //   // })
  //   it("El servicio debe loguear un usuario y devolver una cookie", async () => {
  //     const userMo = {
  //       email: "bode@cal",
  //       password: "bode"
  //     }

  //     const result = await requester.post("/session/login").send(userMo)
  //     const cookieResult = result.headers["set-cookie"][0]
  //     expect(cookieResult).to.be.ok
  //     //console.log(cookieResult)
  //      cookie = {
  //        name: cookieResult.split("=")[0],
  //        value: cookieResult.split("=")[1]
  //      }
  //      expect(cookie.name).to.be.ok.and.eql("coderCookie")
  //      expect(cookie.value).to.be.ok
  //   }).timeout(20000);

  //   it("Debe enviar la cookie del usuario y desestruturar correctamente", async ()=>{
  //     const {_body} = await requester.get("/session/current").set("Cookie", [`${cookie.name}=${cookie.value}`])
  //     expect(_body.payload.email).to.be.eql("bode@cal")
  //   })
  // });

  describe("Test de uploads", () => {
    it("Debe poder crearse un producto con la ruta de imagen", async () => {
      const prodMock = {
        title: "Remera Bad batch",
        category: "ropa",
        stock: "15",
      };
      const result = await requester
        .post("/api/producto/withimage")
        .field("title", prodMock.title)
        .field("category", prodMock.category)
        .field("stock", prodMock.stock)
        .attach("image", "./test/bode.jpg");
        
      expect(result.status).to.be.eql(200);
      expect(result._body.payload).to.have.property("_id");
      expect(result._body.payload.image).to.be.ok;
    }).timeout(20000);
  });
});

//coderCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYm9kZSBha3VuYSIsImVtYWlsIjoiYm9kZUBjYWwiLCJyb2xlIjoidXNlciIsImlhdCI6MTY4OTkwMTM1MSwiZXhwIjoxNjg5OTg3NzUxfQ.9T9jHHr3FCj5jKz58Y7iBZ7JWu_T8ArxhA4aBFstYDY; Max-Age=3600; Path=/; Expires=Fri, 21 Jul 2023 02:02:31 GMT; HttpOnly
