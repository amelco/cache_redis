// redis instalado localmente com o docker:
// $ docker run -p 6379:6379 -d redis redis-server --appendonly yes
//
// Rotas:
// localhost:3000/fatorial/num      -> 'num' é o número que se deseja o fatorial
//    ex. localhost:3000/fatorial/5
// localhost:3000/deleteAll         -> apaga todas as chaves do servidor

var express = require('express');
var app = express();
const port = 3000;
var redis = require('redis');
var redisClient = redis.createClient();

function fatorial(num) {
  if (num <= 0) return 1;
  if (num >=1) return num * fatorial(num - 1);
  else return 1;
}


const getCache = (chave) => {
  return new Promise((resolve, reject) => {
    redisClient.get(chave, (err, valor) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(valor);
      }
    })
  });
};

const setCache = (chave, valor) => {
  return new Promise((resolve, reject) => {
    redisClient.set(chave, valor, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(true);
      }
    })
  });
};

const resetKeys = (cmd) => {
  return new Promise((resolve, reject) => {
    redisClient.flushdb((err, succeeded) => {
      if (err) reject(err);
      else     resolve(true);
    })
  });
};


// inicia servidor
app.listen(port, () => {
  console.log("Servidor localhost:" + port + "\nEscutando...");
})

// define rotas
app.get('/', (req, res) => {
  res.send('Caching...');
});

app.get('/fatorial/:num', async (req, res) => {
  const num = req.params.num;
  const valor = await getCache('fat' + num);
  console.log(valor);
  if (valor == null) {
    console.log("Valor calculado\n");
    const fatValor = fatorial(num);
    const fat = await setCache('fat' + num, fatValor);
    if (fat) res.send("Valor calculado: " + num + "! = " + fatValor);
  } 
  else {
    console.log("Retirado do cache\n");
    res.send("Valor retirado do cache: " + num + "! = " + valor);
    //res.send(valor);
  }
});

app.get('/deleteAll', async (req, res) => {
  const deleted = await resetKeys();
  if (deleted) res.send("Todas as chaves do cache foram deletadas.")
  else         res.send("Erro deletando chaves do cache.");
});

