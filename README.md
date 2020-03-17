# Caching fatorial

## Atividade 2 da disciplina de Banco de Dados

Essa atividade pede para se criar um servidor redis para ser utilizado como um
cache para o cálculo de fatoriais.

Caso seja a primeira vez que se peça o fatorial de um número,
o fatorial é calculado e o resultado é informado.  
Caso seja a segunda vez (ou mais), o resultado deve ser buscado no cache redis
ao invés de ser recalculado.

Foi feita uma pequena aplicação web com as seguintes rotas:

- Rota 1
```
localhost:3000/fatorial/5
```
onde o número `5` é o número em que se deseja obter o fatorial.  
Essa rota retorna o fatorial e avisa se o número foi calculado ou retirado do cache.

- Rota 2
```
localhost:3000/deleteAll
```
caso queira excluir todos os dados do cache.

## Utilização


- instalando redis via docker
```
$ docker run -p 6379:6379 -d redis redis-server --appendonly yes
```
- clone o repositório
```
$ git clone  https://github.com/amelco/cache_redis.git
```
- instale as dependências
```
$ npm install
```
- execute o programa (servidor http)
```
node app.js
```
- Abra o navegador em alguma das rotas supracitadas.
