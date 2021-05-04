import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//Responsável pela exibição das imagens
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);

//ANOTAÇÕES

//Rota = Endereço completo da req
//Recurso = Qual entidade estamos acessando

//GET = Busca 1 ou mais informações do backend
//POST = Criar uma nova informação
//PUT = Atualização da informação existente
//DELETE = Apagar uma informação existente

//req = obtem dados da aplicação
//res = devolve a resposta

//req.params = Parametro que vem na própria rota que identificam um recurso 
//req.query = Parametro geralmente opcionais como filtro, paginação, etc
//req.body = Parametro para criação e atualização de informações

//KNEX//
//knex('users').where('name','Diego').select('*')

//CÓDIGO TESTE

// const users = [
//     'Diego',
//     'Yasmin',
//     'Mariana'
// ];

// app.get('/users', (req, res) => {
//     console.log('Listagem de Usuários!');
//     //JSON
//     res.json(users);
// });

// app.get('/users/:id', (req, res) => {
//     const id = Number(req.params.id); //Number força a transformar em número o id
//     const user = users[id];

//     return res.json(user);
// });

// app.post('/users', (req, res) => {
//     const data = req.body;

//     const user = {
//         name: data.name,
//         email: data.email
//     };

//     return res.json({user});
// });