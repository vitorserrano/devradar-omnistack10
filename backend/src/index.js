//importação de módulos
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-o3ywf.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes); //.use() Válido para todas as rotas da aplicação

// Tipos de parâmetros: 
//Query Params: request.query (Filtross, ordenação, paginação, ...);
//Route Params; request.params (Identificar um recurso através da alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional, host na nuvem)

 app.listen(3333);
