export default async function handler(req, res) {
  // A chave de API não aparece aqui, ela será lida das configurações da Vercel
  const apiKey = process.env.GOOGLE_API_KEY;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Aqui fazemos a chamada real para o Google
    const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
