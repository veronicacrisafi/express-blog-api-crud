function validaDati(req, res, next) {
  const { titolo, contenuto, immagine, tags } = req.body;
  if (!titolo || !contenuto || !immagine || !tags) {
    return res.status(400).json({
      error: true,
      message: "i dati non sono validi",
    });
  }
}

module.exports = validaDati;
