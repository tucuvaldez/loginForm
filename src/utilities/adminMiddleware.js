function createAdminError(route, method) {
  const error = { error: -1 };
  error.description =
    route && method
      ? `Route : '${route}'and method '${method}' not authorized.`
      : "Not authorized";
  return error;
}

function soloAdmins(req, res, next) {
  let esAdmin = true;
  esAdmin ? next() : crearErrorNoEsAdmin();
}

export { soloAdmins, createAdminError };
