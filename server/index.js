const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());


const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  const {params}= req.body;

  const isInTheList = verifyProof(params.proof, params.name, params.root);

  if(isInTheList) {
    res.send(`${params.name}, you got a toy robot!`);
  }
  else {
    res.send(`${params.name}, you are not on the list :(`);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
