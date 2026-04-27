const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*', // Permite qualquer site (Vercel, localhost, etc.)
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept']
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');
app.use('/api', routes);
app.listen(PORT, () => {
 console.log(`Server Started at ${PORT}`)
})

// Obtendo os parametros passados pela linha de comando
var userArgs = process.argv.slice(2);
var mongoURL = process.env.DATABASE_URL || userArgs[0];

//Configurando a conexao com o Banco de Dados
var mongoose = require('mongoose');
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (error) => {
 console.log(error)
})
db.once('connected', () => {
 console.log('Database Connected');
})