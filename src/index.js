const express = require('express');

const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

const customers = [];

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement []
 */

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customersAlreadyExists = customers.some( customer => customer.cpf === cpf );

  if(customersAlreadyExists) {
    return response.status(400).json({error: "Customer already exists!"});
  }

  customers.push({
    id: uuidv4(),
    cpf, 
    name, 
    statement: []
  });

  return response.status(201).send();
});

app.listen(3333);