const post = require("../data/postData");
const connection = require("../database/connection");

const index = (req, res) => {
  //res.json(post);
  //console.log(req.query.tags);
  /*   let filtraPost = post;
  if (req.query.tags) {
    filtraPost = post.filter((postEl) => postEl.tags.includes(req.query.tags));
  }
  res.json(filtraPost); */
  const sql = "SELECT * FROM db_blog.posts;";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log(err);
    console.log(results);
    res.json(results);
  });
};

const show = (req, res) => {
  const { id } = req.params;
  const postEl = post.find((singlePost) => singlePost.id === parseInt(id));
  if (!postEl) {
    return res.status(404).json({
      error: "not found",
      message: "resource not found",
    });
  }
  res.send(postEl);
};

const store = (req, res) => {
  //implementazione
  //gli dco di trovarmi l'ultimo id -1 e per crearne uno nuovo +1
  const newPostId = post[post.length - 1].id + 1;
  //destrutturo prendendo tutte le chiavi dell'oggetto che mi servono per crearne un altro
  const { titolo, contenuto, immagine, tags } = req.body;
  //genero l'oggetto
  const newpost = {
    id: newPostId,
    titolo,
    contenuto,
    immagine,
    tags,
  };
  post.push(newpost);
  res.status(201).json(newpost);
  //res.send("Crea un nuovo post");
};

const update = (req, res) => {
  const { id } = req.params;
  const postEl = post.find((postEl) => postEl.id === parseInt(id));
  if (!postEl) {
    return res.status(404).json({
      error: "not found",
      message: "resource not found",
    });
  }
  const { titolo, contenuto, immagine, tags } = req.body;
  postEl.titolo = titolo;
  postEl.contenuto = contenuto;
  postEl.immagine = immagine;
  postEl.tags = tags;
  res.send(postEl);
  //res.send("Modifica il post con id:" + req.params.id);
};

const modify = (req, res) => {
  res.send("Modifica parzialmente il post con id:" + req.params.id);
};

const destroy = (req, res) => {
  const { id } = req.params;
  const postEl = post.find((singlePost) => singlePost.id === parseInt(id));
  if (!postEl) {
    return res.status(404).json({
      error: "not found",
      message: "resource not found",
    });
  }
  post.splice(post.indexOf(postEl), 1);
  res.sendStatus(204);
};

module.exports = { index, show, store, update, modify, destroy };
