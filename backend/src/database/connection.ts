import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
});

export default connection;

//ANOTAÇÕES

// Migrations = Histórico de db

//EX: create table points
//EX: create table users