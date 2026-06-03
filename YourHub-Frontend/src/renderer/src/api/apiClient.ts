// apiClient.ts
// Główna konfiguracja do połączeń z backendem Spring Boot

const BASE_URL = 'http://localhost:8080/api';

export const apiClient = {
  // Metoda do wysyłania żądań GET
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Błąd sieci (GET):", error);
      throw error;
    }
  },

  post: async (endpoint: string, data?: unknown) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Błąd sieci (POST):", error);
      throw error;
    }
  }
};

async function handleResponse(response: Response) {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = (data && data.message) || response.statusText || data;
    throw new Error(error);
  }

  return data;
}
