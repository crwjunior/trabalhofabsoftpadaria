import React, { useState } from 'react';
import { FaThumbtack, FaBars, FaSignOutAlt } from 'react-icons/fa';
import FormularioProduto from './components/FormularioProduto';
import FormularioFornecedor from './components/FormularioFornecedor';
import FormularioFuncionario from './components/FormularioFuncionario';
import LoginForm from './components/LoginForm';
import ListaProdutos from './components/ListaProdutos';
import ListaFornecedores from './components/ListaFornecedores';
import ListaFuncionarios from './components/ListaFuncionarios';
import EditarProdutoModal from './components/EditarProdutoModal';
import EditarFuncionarioModal from './components/EditarFuncionarioModal';
import styles from './App.module.css';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

interface Fornecedor {
  id: number;
  nome: string;
  fornece: string;
  localizacao: { value: string; label: string };
  periodoFornecimento: { dataInicio: Date; dataFim: Date };
}

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  email: string;
}

interface Usuario {
  username: string;
  password: string;
  role: 'admin' | 'user' | 'limited';
}

const App: React.FC = () => {
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [produtoAtual, setProdutoAtual] = useState<Produto | null>(null);
  const [funcionarioAtual, setFuncionarioAtual] = useState<Funcionario | null>(null);
  const [visualizacao, setVisualizacao] = useState<'formularioProduto' | 'formularioFornecedor' | 'formularioFuncionario' | 'listaProdutos' | 'listaFornecedores' | 'listaFuncionarios'>('formularioProduto');
  const [modoEscuro, setModoEscuro] = useState<boolean>(false);
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const [menuFixo, setMenuFixo] = useState<boolean>(false);
  const [modalProdutoAberto, setModalProdutoAberto] = useState<boolean>(false);
  const [modalFuncionarioAberto, setModalFuncionarioAberto] = useState<boolean>(false);

  const adicionarProduto = (produto: Produto) => {
    setProdutos([...produtos, { ...produto, id: produtos.length + 1 }]);
  };

  const atualizarProduto = (produtoAtualizado: Produto) => {
    setProdutos(produtos.map((produto) => (produto.id === produtoAtualizado.id ? produtoAtualizado : produto)));
    setProdutoAtual(null);
    setModalProdutoAberto(false);
  };

  const excluirProduto = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProdutos(produtos.filter((produto) => produto.id !== id));
    }
  };

  const adicionarFornecedor = (fornecedor: Fornecedor) => {
    setFornecedores([...fornecedores, { ...fornecedor, id: fornecedores.length + 1 }]);
  };

  const excluirFornecedor = (id: number) => {
    if (window.confirm("Tem certeza que deseja encerrar o contrato deste fornecedor?")) {
      setFornecedores(fornecedores.filter((fornecedor) => fornecedor.id !== id));
    }
  };

  const adicionarFuncionario = (funcionario: Funcionario) => {
    setFuncionarios([...funcionarios, { ...funcionario, id: funcionarios.length + 1 }]);
  };

  const atualizarFuncionario = (funcionarioAtualizado: Funcionario) => {
    setFuncionarios(funcionarios.map((funcionario) => (funcionario.id === funcionarioAtualizado.id ? funcionarioAtualizado : funcionario)));
    setFuncionarioAtual(null);
    setModalFuncionarioAberto(false);
  };

  const excluirFuncionario = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      setFuncionarios(funcionarios.filter((funcionario) => funcionario.id !== id));
    }
  };

  const alternarModoEscuro = () => {
    setModoEscuro(!modoEscuro);
  };

  const alternarMenuFixo = () => {
    setMenuFixo(!menuFixo);
  };

  const login = (username: string, password: string) => {
    const usuarioAdmin = { username: 'admin', password: 'admin', role: 'admin' as const };
    const usuarioNormal = { username: 'user', password: 'user', role: 'user' as const };
    const usuarioLimitado = { username: 'limited', password: 'limited', role: 'limited' as const };

    if (username === usuarioAdmin.username && password === usuarioAdmin.password) {
      setUsuarioAtual(usuarioAdmin);
      setAutenticado(true);
    } else if (username === usuarioNormal.username && password === usuarioNormal.password) {
      setUsuarioAtual(usuarioNormal);
      setAutenticado(true);
    } else if (username === usuarioLimitado.username && password === usuarioLimitado.password) {
      setUsuarioAtual(usuarioLimitado);
      setAutenticado(true);
    } else {
      alert('Credenciais inválidas');
    }
  };

  const logout = () => {
    setAutenticado(false);
    setUsuarioAtual(null);
  };

  if (!autenticado) {
    return <LoginForm onLogin={login} modoEscuro={modoEscuro} alternarModoEscuro={alternarModoEscuro} />;
  }

  return (
    <div className={`${styles['app-container']} ${modoEscuro ? styles['dark-mode'] : styles['light-mode']}`}>
      <nav
        className={`${styles.sidebar} ${menuAberto || menuFixo ? styles.open : ''}`}
        onMouseEnter={() => !menuFixo && setMenuAberto(true)}
        onMouseLeave={() => !menuFixo && setMenuAberto(false)}
      >
        <div className={styles['menu-icons']}>
          <FaBars className={styles.icon} onClick={() => setMenuAberto(!menuAberto)} />
          <FaThumbtack className={`${styles.icon} ${menuFixo ? styles.fixed : ''}`} onClick={alternarMenuFixo} />
          <FaSignOutAlt className={styles.icon} onClick={logout} />
        </div>
        <ul>
          <li onClick={() => setVisualizacao('formularioProduto')}>Cadastrar Produto</li>
          {usuarioAtual?.role === 'admin' && (
            <>
              <li onClick={() => setVisualizacao('formularioFornecedor')}>Cadastrar Fornecedor</li>
              <li onClick={() => setVisualizacao('listaFornecedores')}>Listar Fornecedores</li>
              <li onClick={() => setVisualizacao('formularioFuncionario')}>Cadastrar Funcionário</li>
              <li onClick={() => setVisualizacao('listaFuncionarios')}>Listar Funcionários</li>
            </>
          )}
          {usuarioAtual?.role === 'user' && (
            <>
              <li onClick={() => setVisualizacao('formularioFornecedor')}>Cadastrar Fornecedor</li>
              <li onClick={() => setVisualizacao('listaFornecedores')}>Listar Fornecedores</li>
            </>
          )}
          <li onClick={() => setVisualizacao('listaProdutos')}>Lista de Produtos</li>
        </ul>
        <button onClick={alternarModoEscuro} className={styles['toggle-button']}>
          {modoEscuro ? 'Modo Claro' : 'Modo Escuro'}
        </button>
      </nav>
      <div className={styles['main-content']}>
        <div className={styles.content}>
          {visualizacao === 'formularioProduto' && (
            <>
              <h1>Cadastro de Produto</h1>
              <FormularioProduto
                initialValues={produtoAtual || { nome: '', preco: 0, descricao: '' }}
                onSubmit={(values, { resetForm }) => {
                  if (produtoAtual) {
                    atualizarProduto({ ...produtoAtual, ...values });
                  } else {
                    adicionarProduto(values as Produto);
                  }
                  resetForm();
                }}
              />
            </>
          )}
          {visualizacao === 'formularioFornecedor' && (
            <>
              <h1>Cadastro de Fornecedor</h1>
              <FormularioFornecedor
                initialValues={{ nome: '', fornece: '', localizacao: { value: '', label: '' }, periodoFornecimento: { dataInicio: new Date(), dataFim: new Date() } }}
                onSubmit={(values, { resetForm }) => {
                  adicionarFornecedor(values as Fornecedor);
                  resetForm();
                }}
              />
            </>
          )}
          {visualizacao === 'listaFornecedores' && (
            <>
              <h1>Lista de Fornecedores</h1>
              <ListaFornecedores
                fornecedores={fornecedores}
                onEncerrarContrato={excluirFornecedor}
              />
            </>
          )}
          {visualizacao === 'formularioFuncionario' && (
            <>
              <h1>Cadastro de Funcionário</h1>
              <FormularioFuncionario
                initialValues={{ nome: '', cargo: '', email: '' }}
                onSubmit={(values, { resetForm }) => {
                  adicionarFuncionario(values as Funcionario);
                  resetForm();
                }}
              />
            </>
          )}
          {visualizacao === 'listaFuncionarios' && (
            <>
              <h1>Lista de Funcionários</h1>
              <ListaFuncionarios
                funcionarios={funcionarios}
                onEdit={(funcionario) => {
                  setFuncionarioAtual(funcionario);
                  setModalFuncionarioAberto(true);
                }}
                onDelete={excluirFuncionario}
              />
            </>
          )}
          {visualizacao === 'listaProdutos' && (
            <ListaProdutos
              produtos={produtos}
              onEdit={(produto) => {
                setProdutoAtual(produto);
                setModalProdutoAberto(true);
              }}
              onDelete={excluirProduto}
            />
          )}
        </div>
      </div>
      {modalProdutoAberto && produtoAtual && (
        <EditarProdutoModal
          produto={produtoAtual}
          onClose={() => setModalProdutoAberto(false)}
          onSave={atualizarProduto}
        />
      )}
      {modalFuncionarioAberto && funcionarioAtual && (
        <EditarFuncionarioModal
          funcionario={funcionarioAtual}
          onClose={() => setModalFuncionarioAberto(false)}
          onSave={atualizarFuncionario}
        />
      )}
    </div>
  );
};

export default App;
