
const DB_KEY = 'pedidos';

export const readDbFile = (): any[] => {
  try {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const writeDbFile = (data: any[]): void => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  } catch (error) {
    console.log('Erro ao gravar dados no banco de dados', error);
  }
};
