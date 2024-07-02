import React from 'react';
import styles from './ListaProdutos.module.css';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

interface ListaProdutosProps {
  produtos: Produto[];
  onEdit: (produto: Produto) => void;
  onDelete: (id: number) => void;
}

const ListaProdutos: React.FC<ListaProdutosProps> = ({ produtos, onEdit, onDelete }) => {
  return (
    <div className={styles.listaProdutos}>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            <div>
              <p>{produto.nome}</p>
              <p>{produto.preco}</p>
              <p>{produto.descricao}</p>
              <div>
                <button onClick={() => onEdit(produto)}>Editar</button>
                <button onClick={() => onDelete(produto.id)}>Excluir</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProdutos;
