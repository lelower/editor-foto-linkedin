export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const googleResponse = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await googleResponse.json();

    // Se o Google retornou erro (ex: chave inválida ou cota excedida)
    if (!googleResponse.ok) {
        console.error("Erro na API do Google:", data);
        return res.status(googleResponse.status).json(data);
    }

    // Retorna exatamente o que o Google mandou, sem filtrar nada
    return res.status(200).json(data);

  } catch (error) {
    console.error("Erro no Servidor Vercel:", error);
    return res.status(500).json({ error: 'Falha interna ao processar a requisição' });
  }
}
