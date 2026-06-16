import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export async function getDBConnection() {
  return SQLite.openDatabase({ name: 'produtos.db', location: 'default' });
}

export async function createTable(db) {
  await db.executeSql(
    `CREATE TABLE IF NOT EXISTS produtos (
       id      INTEGER PRIMARY KEY AUTOINCREMENT,
       nome    TEXT NOT NULL,
       preco   REAL
     )`
  );
}

export async function inserirProduto(db, nome, preco) {
  await db.executeSql(
    'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
    [nome, preco]
  );
}

export async function buscarProdutos(db) {
  const [resultado] = await db.executeSql('SELECT * FROM produtos');
  const lista = [];
  for (let i = 0; i < resultado.rows.length; i++) {
    lista.push(resultado.rows.item(i));
  }
  return lista;
}


