import React, { createContext, useState, useContext } from 'react';
import { getDBConnection, createTable, inserirProduto, buscarProdutos } from '../database/database';

const ProdutoContext = createContext();

export function ProdutoProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [db, setDb] = useState(null);

  async function iniciarBanco() {
    const conexao = await getDBConnection();
    await createTable(conexao);
    setDb(conexao);
    const lista = await buscarProdutos(conexao);
    setProdutos(lista);
  }

  async function adicionarProduto(nome, preco) {
    await inserirProduto(db, nome, preco);
    const lista = await buscarProdutos(db);
    setProdutos(lista);
  }

  return (
    <ProdutoContext.Provider value={{ produtos, iniciarBanco, adicionarProduto }}>
      {children}
    </ProdutoContext.Provider>
  );
}

export function useProdutos() {
  return useContext(ProdutoContext);
}
