import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './EditarProdutoModal.module.css';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

interface EditarProdutoModalProps {
  produto: Produto;
  onClose: () => void;
  onSave: (produto: Produto) => void;
}

const EditarProdutoModal: React.FC<EditarProdutoModalProps> = ({ produto, onClose, onSave }) => {
  const validationSchema = Yup.object({
    nome: Yup.string().required('Preencha Corretamente'),
    preco: Yup.number().required('Preencha Corretamente').positive('Deve ser um número positivo'),
    descricao: Yup.string().required('Preencha Corretamente'),
  });

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Editar Produto</h2>
        <Formik
          initialValues={produto}
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
                <label htmlFor="preco">Preço</label>
                <Field type="number" name="preco" />
                <ErrorMessage name="preco" component="div" className={styles.errorPopup} />
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="descricao">Descrição</label>
                <Field type="text" name="descricao" />
                <ErrorMessage name="descricao" component="div" className={styles.errorPopup} />
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

export default EditarProdutoModal;
