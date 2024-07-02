import React from 'react';
import styles from './ListaFornecedores.module.css';

interface Fornecedor {
  id: number;
  nome: string;
  fornece: string;
  localizacao: { value: string; label: string };
  periodoFornecimento: { dataInicio: Date; dataFim: Date };
}

interface ListaFornecedoresProps {
  fornecedores: Fornecedor[];
  onEncerrarContrato: (id: number) => void;
}

const ListaFornecedores: React.FC<ListaFornecedoresProps> = ({ fornecedores, onEncerrarContrato }) => {
  return (
    <div className={styles.listaFornecedores}>
      <ul>
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.id}>
            <div>
              <strong>Nome: </strong>{fornecedor.nome}
            </div>
            <div>
              <strong>Fornece: </strong>{fornecedor.fornece}
            </div>
            <div>
              <strong>Localização: </strong>{fornecedor.localizacao.label}
            </div>
            <div>
              <strong>Período de Fornecimento: </strong>
              {fornecedor.periodoFornecimento.dataInicio.toLocaleDateString()} - {fornecedor.periodoFornecimento.dataFim.toLocaleDateString()}
            </div>
            <button onClick={() => onEncerrarContrato(fornecedor.id)}>Encerrar Contrato</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaFornecedores;
