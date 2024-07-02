import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './EditarFuncionarioModal.module.css';

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  email: string;
}

interface EditarFuncionarioModalProps {
  funcionario: Funcionario;
  onClose: () => void;
  onSave: (funcionario: Funcionario) => void;
}

const EditarFuncionarioModal: React.FC<EditarFuncionarioModalProps> = ({ funcionario, onClose, onSave }) => {
  const validationSchema = Yup.object({
    nome: Yup.string().required('Preencha Corretamente'),
    cargo: Yup.string().required('Preencha Corretamente'),
    email: Yup.string().email('E-mail inválido').required('Preencha Corretamente'),
  });

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Editar Funcionário</h2>
        <Formik
          initialValues={funcionario}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSave(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.fieldContainer}>
                <label htmlFor="nome">Nome</label>
                <Field type="text" name="nome" />
                <ErrorMessage name="nome" component="div" className={styles.errorPopup} />
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="cargo">Cargo</label>
                <Field type="text" name="cargo" />
                <ErrorMessage name="cargo" component="div" className={styles.errorPopup} />
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="email">E-mail</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className={styles.errorPopup} />
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit" disabled={isSubmitting}>Salvar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditarFuncionarioModal;
