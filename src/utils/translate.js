export const translateToPTBR = async (text) => {
  const fallback = text;

  try {
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'pt',
        format: 'text',
      }),
    });

    const data = await response.json();

    if (data?.translatedText) {
      return data.translatedText;
    }

    console.warn('Tradução falhou. Retornando texto original.');
    return fallback;
  } catch (error) {
    console.error('Erro ao traduzir texto:', error);
    return fallback;
  }
};
