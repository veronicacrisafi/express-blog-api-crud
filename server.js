/* Esercizio
Milestone 1

Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers. 

All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi). 

Poi torniamo sul file delle rotte. Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.

Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima. 

Se tutto funziona, passiamo alla prossima milestone

Milestone 2

Per iniziare, creiamo una cartella data  in cui creare un file che contenga ed esporti l’array di posts che trovate in allegato.  Importiamo questo file in cima al controller. 

Ora passiamo ad implementare le logiche delle nostre CRUD:

Index dovrà restituire la lista dei post in formato JSON
Show dovrà restituire un singolo post in formato JSON
Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.

Bonus
Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag
In Show e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.
 */

const express = require("express");
const app = express();
//console.log(app);
const port = 3000;
const postRouter = require("./routers/postRouter");

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server in ascolto nella porta http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Benvenuto nel mio blog");
});
/* const post = [
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
]; */

app.get("/post", (req, res) => {
  res.json(post);
});

app.use("/api/post", postRouter);

/* //operazioni CRUD

//index(R) con implementazione
app.get("/api/post", (req, res) => {
  //res.json(post);
  //console.log(req.query.tags);
  let filtraPost = post;
  if (req.query.tags) {
    filtraPost = post.filter((postEl) => postEl.tags.includes(req.query.tags));
  }
  res.json(filtraPost);
});

//show(R) con implementazione
app.get("api/post/:id", (req, res) => {
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
app.post("/api/post", (req, res) => {
  res.send("Crea un nuovo post");
});
//update(U)
app.put("/api/post/:id", (req, res) => {
  res.send("Modifica il post con id:" + req.params.id);
});
//modify(U)
app.patch("/api/post/:id", (req, res) => {
  res.send("Modifica parzialmente il post con id:" + req.params.id);
});
//destroy(D)
app.delete("/api/post/:id", (req, res) => {
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
 */
