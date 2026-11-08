const express = require('express');
const app = express();
const PORT = 3000;

// 🔑 ВСТАВЬ СВОЙ КЛЮЧ
const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBjNjAyNzFmLWUzZjItNGQ5ZS05MDFhLTZkNzJmZGFhM2M2NyIsImlhdCI6MTc5NDE1MDAxOSwic3ViIjoiZGV2ZWxvcGVyLzI4OGY2ZjA1LWQwYWEtNDIxZi04ZmYwLTI0ODMwMWQyM2I3MCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTUuMTA0LjE3MC41MSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.OPaqOskEe4sv39rBeSlukoC4itpHxhBBjRjYYRoXESReThFGJIen47wkBPPWlT1QxqP4HGCUEfId0PYjRQf_ug';

const API_URL = 'https://api.brawlstars.com/v1';

// Middleware
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(__dirname));

// 1. Профиль игрока
app.get('/api/player/:tag', async (req, res) => {
  const tag = req.params.tag.replace('#', '').toUpperCase();
  try {
    const response = await fetch(`${API_URL}/players/%23${tag}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Accept': 'application/json' }
    });
    if (!response.ok) return res.status(response.status).json({ error: 'Ошибка API: ' + response.status });
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. История боёв
app.get('/api/player/:tag/battlelog', async (req, res) => {
  const tag = req.params.tag.replace('#', '').toUpperCase();
  try {
    const response = await fetch(`${API_URL}/players/%23${tag}/battlelog`, {
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Accept': 'application/json' }
    });
    if (!response.ok) return res.status(response.status).json({ error: 'Ошибка API: ' + response.status });
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. 🆕 Список всех бойцов (с иконками и редкостью)
app.get('/api/brawlers', async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/brawlers`, {
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Accept': 'application/json' }
    });
    if (!response.ok) return res.status(response.status).json({ error: 'Ошибка API: ' + response.status });
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════');
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
  console.log('⚠️  НЕ ЗАКРЫВАЙ это окно!');
  console.log('═══════════════════════════════════════════');
});