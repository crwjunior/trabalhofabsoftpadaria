import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './FormularioProduto.module.css';

interface Produto {
  nome: string;
  preco: number;
  descricao: string;
}

interface FormularioProdutoProps {
  initialValues: Produto;
  onSubmit: (values: Produto, { resetForm }: { resetForm: () => void }) => void;
}

const FormularioProduto: React.FC<FormularioProdutoProps> = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    nome: Yup.string().required('Preencha Corretamente'),
    preco: Yup.number().required('Preencha Corretamente').positive('Deve ser um número positivo'),
    descricao: Yup.string().required('Preencha Corretamente'),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className={styles.form}>
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
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioProduto;
