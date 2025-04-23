const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados
let database = {
  stores: [
    { id: 'tacaruna', name: 'Tacaruna', employeeCount: 2 },
    { id: 'riomar', name: 'Riomar', employeeCount: 1 }
  ],
  employees: [
    { id: 'admin', name: 'Admin', password: 'admin123', isAdmin: true },
    { id: '12345', name: 'João Silva', password: 'senha123', isAdmin: false, storeId: 'tacaruna' }
  ],
  payslips: []
};

// Rotas básicas
app.get('/api/stores', (req, res) => {
  res.json(database.stores);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = database.employees.find(e => e.id === username && e.password === password);
  
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false });
  }
});

// Pasta pública para o frontend
app.use(express.static('public'));

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Esta era a linha problemática
});