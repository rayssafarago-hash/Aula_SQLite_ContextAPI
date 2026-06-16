import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useProdutos } from '../context/ProdutoContext';

export default function TelaProdutos() {
  const { produtos, iniciarBanco, adicionarProduto } = useProdutos();
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    iniciarBanco();
  }, []);

  function salvar() {
    if (nome && preco) {
      adicionarProduto(nome, parseFloat(preco));
      setNome('');
      setPreco('');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Produtos</Text>

      <TextInput
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Salvar" onPress={salvar} />

      <FlatList
        data={produtos}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.nome} – R$ {item.preco.toFixed(2)}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  titulo:    { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input:     { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 6 },
  item:      { fontSize: 16, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#eee' },
});

