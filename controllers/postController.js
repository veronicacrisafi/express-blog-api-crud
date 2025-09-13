const post = require("../data/postData");

const index = (req, res) => {
  //res.json(post);
  //console.log(req.query.tags);
  let filtraPost = post;
  if (req.query.tags) {
    filtraPost = post.filter((postEl) => postEl.tags.includes(req.query.tags));
  }
  res.json(filtraPost);
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
  const post = post.find((postEl) => postEl.id === parseInt(id));
  if (!post) {
    return res.status(404).json({
      error: "not found",
      message: "resource not found",
    });
  }
  const { titolo, contenuto, immagine, tags } = req.body;
  post.titolo = titolo;
  post.contenuto = contenuto;
  post.immagine = immagine;
  post.tags = tags;
  res.send(post);
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
