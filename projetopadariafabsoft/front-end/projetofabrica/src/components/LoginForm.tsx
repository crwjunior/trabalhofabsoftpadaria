import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  modoEscuro: boolean;
  alternarModoEscuro: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, modoEscuro, alternarModoEscuro }) => {
  const validationSchema = Yup.object({
    username: Yup.string().required('Preencha Corretamente'),
    password: Yup.string().required('Preencha Corretamente'),
  });

  return (
    <div className={`${styles['login-container']} ${modoEscuro ? styles['dark-mode'] : styles['light-mode']}`}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onLogin(values.username, values.password);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.fieldContainer}>
              <label htmlFor="username">Usuário</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" className={styles.errorPopup} />
            </div>
            <div className={styles.fieldContainer}>
              <label htmlFor="password">Senha</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className={styles.errorPopup} />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Entrar
            </button>
          </Form>
        )}
      </Formik>
      <button onClick={alternarModoEscuro} className={styles['toggle-button']}>
        {modoEscuro ? 'Modo Claro' : 'Modo Escuro'}
      </button>
    </div>
  );
};

export default LoginForm;
