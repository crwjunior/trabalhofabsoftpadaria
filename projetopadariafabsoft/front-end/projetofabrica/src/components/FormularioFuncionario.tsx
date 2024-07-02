import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './FormularioFuncionario.module.css';

interface Funcionario {
  nome: string;
  cargo: string;
  email: string;
}

interface FormularioFuncionarioProps {
  initialValues: Funcionario;
  onSubmit: (values: Funcionario, { resetForm }: { resetForm: () => void }) => void;
}

const FormularioFuncionario: React.FC<FormularioFuncionarioProps> = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    nome: Yup.string().required('Preencha Corretamente'),
    cargo: Yup.string().required('Preencha Corretamente'),
    email: Yup.string().email('E-mail inválido').required('Preencha Corretamente'),
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
            <label htmlFor="cargo">Cargo</label>
            <Field type="text" name="cargo" />
            <ErrorMessage name="cargo" component="div" className={styles.errorPopup} />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="email">E-mail</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className={styles.errorPopup} />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioFuncionario;
