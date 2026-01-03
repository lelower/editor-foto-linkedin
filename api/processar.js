// api/processar.js
export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    // Usamos a v1beta para ter acesso aos recursos experimentais de imagem
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

    const googleResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await googleResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}
