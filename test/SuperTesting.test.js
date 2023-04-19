import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Pruebas de integracion con servidor completo", () => {
  it("El endpoint POST /api/sessions/register debe registrar correctamente al usuario", async function () {
    const testUser = {
      firstName: "Test User",
      lastName: "User",
      email: "user@user.com",
      password: "123",
      phone: "23455",
      age: "23",
      address: "casaUser",
    };
    //const response = requester.post("api/sessions/register").send(testUser); //Si no hay archivos involucrados
    const response = await requester
      .post("/api/sessions/register")
      .field(`firstName`, testUser.firstName)
      .field(`lastName`, testUser.lastName)
      .field(`email`, testUser.email)
      .field(`password`, testUser.password)
      .field(`phone`, testUser.phone)
      .field(`address`, testUser.address)
      .field(`age`, testUser.age)
      .attach(`avatar`, `./test/foto.JPG`);
    expect(response.status).to.be.equal(200);
    const { _body } = response;
    expect(_body.message).to.be.equal("Registrado");
  });

  it("El endpoint GET /api/productos debe traer los productos", async function () {
    const response = await requester.get("/api/productos");
    expect(response.status).to.be.equal(200);
    const { _body } = response;
    console.log(_body);
    expect(_body.payload).to.be.ok;
  });
});
