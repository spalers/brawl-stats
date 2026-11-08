const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// ⚠️ ВСТАВЬ СВОЙ КЛЮЧ МЕЖДУ КАВЫЧКАМИ:
const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImIwNjEwMWNjLTJhNDgtNDFjZC05YWUzLWFlMjE1YjEyYTA5NiIsImlhdCI6MTc5NDE4MDYyMSwic3ViIjoiZGV2ZWxvcGVyLzI4OGY2ZjA1LWQwYWEtNDIxZi04ZmYwLTI0ODMwMWQyM2I3MCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTUuMTA0LjE3MC41MSIsIjQ1Ljc5LjIxOC43OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.VLyTBxKLNYCJMvT2wP_pNBh-b6vdtIv6P4Eydu_ISndCwkylcxmlM7F9LMUG0JEeCWJf8qpAD1o4j0byb2a_-A';

const API_URL = 'https://api.brawlstars.com/v1';

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(path.join(__dirname)));

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

app.listen(PORT, () => console.log(`✅ Сервер запущен: http://localhost:${PORT}`));