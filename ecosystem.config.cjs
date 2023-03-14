module.exports = {
  apps: [
    {
      name: "Servidor1",
      script: "./src/app.js",
      env: {
        PORT: 8080,
      },
    },
    {
      name: "Servidor2",
      script: "./src/app.js",
      env: {
        PORT: 8081,
      },
    },
    {
      name: "Servidor3",
      script: "./src/app.js",
      env: {
        PORT: 8082,
      },
      exec_mode: "cluster",
      instances: 5,
    },
  ],
};
