import React from 'react';
import { ProdutoProvider } from './src/context/ProdutoContext';
import TelaProdutos from './src/screens/TelaProdutos';

export default function App() {
  return (
    <ProdutoProvider>
      <TelaProdutos />
    </ProdutoProvider>
  );
}
