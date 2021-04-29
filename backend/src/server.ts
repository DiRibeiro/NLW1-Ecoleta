import express from 'express';

const app = express();

//req = obtem dados da aplicação
//res = devolve a resposta
app.get('/users', (req, res) => {
    console.log('Listagem de Usuários!');
    //JSON
    res.json([
        'Diego',
        'Yasmin',
        'Mariana'
    ]);
});

app.listen(3333);