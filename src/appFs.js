// import express from "express";
// import session from "express-session";
// import storage from "session-file-store";

// const app = express();
// const PORT = process.env.PORT || 3000;
// const FileStore = storage(session);

// app.use(
//   session({
//     store: new FileStore({ path: "./sessions", ttl: 200, retries: 0 }),
//     secret: "secretWord4321",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.get("/", (req, res) => {
//   req.session.user = { nombre: "Tucu", role: "admin" };
//   res.send("Hola");
// });
// app.listen(PORT, () => {
//   console.log(`Listening on port: ${PORT}
// `);
// });
