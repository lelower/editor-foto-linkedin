export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // URL Atualizada para v1 (mais estável) e nome correto do modelo
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const googleResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await googleResponse.json();

    if (!googleResponse.ok) {
      console.error("Erro detalhado do Google:", data);
      return res.status(googleResponse.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao conectar com a API' });
  }
}
