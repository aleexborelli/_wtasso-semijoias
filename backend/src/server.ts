import express from 'express'

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  return res.json({ message: '🚀 Servidor rodando na porta 33330' })
})