//Interface que define todos os parametros de uma Receita
export interface Receita {
    id: number,
    receita: string
    ingredientes: string
    modo_preparo: string
    link_imagem: string
    tipo: string
}
