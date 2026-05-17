require('dotenv').config();

const express = require('express');
const path = require('path');
const supabase = require('./supabase');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('test')
      .select('*');

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});