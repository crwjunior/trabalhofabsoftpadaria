import React from 'react';
import styles from './ListaFuncionarios.module.css';

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  email: string;
}

interface ListaFuncionariosProps {
  funcionarios: Funcionario[];
  onEdit: (funcionario: Funcionario) => void;
  onDelete: (id: number) => void;
}

const ListaFuncionarios: React.FC<ListaFuncionariosProps> = ({ funcionarios, onEdit, onDelete }) => {
  return (
    <div className={styles.listaFuncionarios}>
      <ul>
        {funcionarios.map((funcionario) => (
          <li key={funcionario.id}>
            <div>
              <p>{funcionario.nome}</p>
              <p>{funcionario.cargo}</p>
              <p>{funcionario.email}</p>
              <div>
                <button onClick={() => onEdit(funcionario)}>Editar</button>
                <button onClick={() => onDelete(funcionario.id)}>Excluir</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaFuncionarios;
