const express = require("express");
const router = express.router();
const post = [
  {
    id: 1,
    titolo: "Il ciambellone",
    contenuto:
      "Sarà che una volta le cose erano più semplici, ma erano anche molto buone. Come la crostata di marmellata, i biscotti o il ciambellone che la nonna preparava anche all'ultimo sapendo che sareste passati per la merenda: uova, zucchero e farina. Niente di più basic ma che tra le sue mani, mescolando e infornando, diventava una delle prelibatezze per accompagnare il succo di frutta al pomeriggio o il latte e caffè al mattino. Ecco la nostra ricetta del ciambellone a quale atmosfera si ispira, quella di casa e genuinità: con una manciata di scorze di limone o di arancia e una spolverata di zucchero a velo renderete questa soffice delizia profumata e invitante. E per una volta sarà la nonna a farvi i complimenti per aver preparato un morbido ciambellone, così buono che non passa mai di moda!",
    immagine: "imgs/ciambellone.jpeg",
    tags: ["blog", "ciambellone", "uova", "zucchero", "farina"],
  },
  {
    id: 2,
    titolo: "Cracker alla barbabietola",
    contenuto:
      "I cracker alla barbabietola sono uno snack stuzzicante e originale da preparare in casa utilizzando ingredienti semplici e genuini. Queste sfogliette dal colore brillante non passeranno inosservate nel vostro cestino del pane e arricchiranno la tavola con il loro gusto unico e accattivante. I cracker fatti a mano sono anche un gustoso snack spezza fame, da portare in ufficio o a scuola!",
    immagine: "imgs/cracker_barbabietola.jpeg",
    tags: ["blog", "cracker", "barbabietola", "originale"],
  },
  {
    id: 3,
    titolo: "Pane fritto dolce",
    contenuto:
      "Il pane fritto dolce è la versione più antica dell’odierno french toast! Una deliziosa ricetta antispreco che le nonne preparavano ai bambini per merenda, utilizzando gli ingredienti che si avevano sempre a disposizione in casa: pane raffermo, uova, latte e zucchero",
    immagine: "imgs/pane_fritto_dolce.jpeg",
    tags: ["blog", "pane", "dolce", "antispreco"],
  },
  {
    id: 4,
    titolo: "Pasta alla barbabietola",
    contenuto:
      "Si tratta di un impasto a base di farina e barbabietole precotte, con aggiunta dell'uovo per dare più corpo ed elasticità: perfetta per ravioli burro e salvia, sfoglie per lasagne, maltagliati oppure gustose e primaverili tagliatelle alla barbabietola con asparagi. La barbabietola, con il suo vivace color amaranto, è una gustosa tintura al naturale, perfetta per ravvivare i vostri impasti!",
    immagine: "imgs/pasta_barbabietola.jpeg",
    tags: ["blog", "pasta", "barbabietola", "ravvivare"],
  },
  {
    id: 5,
    titolo: "Torta paesana",
    contenuto:
      "La torta paesana è un dolce di origine lombarda e precisamente della Brianza, la zona compresa tra la provincia a nord di Milano e il lago di Lecco-Como. E’ un dolce di origine contadina, dalle infinite varianti, ma realizzata principalmente con pane raffermo bagnato nel latte. E’ infatti conosciuta anche come torta di pane o, in dialetto locale, “michelacc” ovvero mica e lac (pane e latte). A seconda dei gusti e delle disponibilità del momento, al pane ammollato ogni famiglia univa ingredienti diversi, chi l’uvetta o chi i pinoli ad esempio. Perfetta da gustare per una merenda dal sapore rustico, la torta paesana è un perfetto dolce di recupero quando si ha del pane avanzato… ed è ancora più buona il giorno dopo!",
    immagine: "imgs/torta_paesana.jpeg",
    tags: ["blog", "torta", "pane", "latte"],
  },
];

//operazioni CRUD
//index(R) con implementazione
router.get("/api/post", (req, res) => {
  //res.json(post);
  //console.log(req.query.tags);
  let filtraPost = post;
  if (req.query.tags) {
    filtraPost = post.filter((postEl) => postEl.tags.includes(req.query.tags));
  }
  res.json(filtraPost);
});

//show(R) con implementazione
router.get("api/post/:id", (req, res) => {
  const { id } = req.params;
  const postEl = post.find((singlePost) => singlePost.id === parseInt(id));
  if (!postEl) {
    return res.status(404).json({
      error: "not found",
      message: "resource not found",
    });
  }
  res.send(postEl);
});
//store(C)
router.post("/api/post", (req, res) => {
  res.send("Crea un nuovo post");
});
//update(U)
router.put("/api/post/:id", (req, res) => {
  res.send("Modifica il post con id:" + req.params.id);
});
//modify(U)
router.patch("/api/post/:id", (req, res) => {
  res.send("Modifica parzialmente il post con id:" + req.params.id);
});
//destroy(D)
router.delete("/api/post/:id", (req, res) => {
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
});

module.exports = router;
