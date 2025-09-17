/* Esercizio
Dopo aver completato tutte le operazioni CRUD, completiamo le nostre API inserendo un middleware per la gestione delle rotte non registrate e uno per la gestione degli errori.
Se viene chiamato un endpoint inesistente, un middleware dovrà rispondere un messaggio e uno status appropriato.
Se viene generato un errore, un middleware si occuperà di rispondere con un messaggio e uno status appropriato. */

function serverError(err, req, res, next) {
  res.status(500).json({
    error: true,
    message: err.message,
    stack: err.stack,
  });
}

module.exports = serverError;
