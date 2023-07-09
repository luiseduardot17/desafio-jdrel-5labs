export default interface ICheckoutForm {
    nome: string;
    email: string;
    telefone: string;
    documento: string;
    cep: string;
    logradouro: string;
    numero: string | number;
    complemento: string;
    cidade: string;
    bairro: string;
    uf: string;
}
