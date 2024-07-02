import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './FormularioFornecedor.module.css';

interface Fornecedor {
  nome: string;
  fornece: string;
  localizacao: { value: string; label: string };
  periodoFornecimento: { dataInicio: Date; dataFim: Date };
}

interface FormularioFornecedorProps {
  initialValues: Fornecedor;
  onSubmit: (values: Fornecedor, { resetForm }: { resetForm: () => void }) => void;
}

const opcoesCidades = [
  { value: 'cidade1', label: 'Cidade 1' },
  { value: 'cidade2', label: 'Cidade 2' },
];

const FormularioFornecedor: React.FC<FormularioFornecedorProps> = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    nome: Yup.string().required('Preencha Corretamente'),
    fornece: Yup.string().required('Preencha Corretamente'),
    localizacao: Yup.object().shape({
      value: Yup.string().required('Preencha Corretamente'),
      label: Yup.string().required('Preencha Corretamente'),
    }).required('Preencha Corretamente'),
    periodoFornecimento: Yup.object().shape({
      dataInicio: Yup.date().required('Preencha Corretamente'),
      dataFim: Yup.date().required('Preencha Corretamente')
        .min(Yup.ref('dataInicio'), 'A data final deve ser posterior à data inicial'),
    }).required('Preencha Corretamente'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className={styles.form}>
          <div className={styles.fieldContainer}>
            <label htmlFor="nome">Nome</label>
            <Field type="text" name="nome" />
            <ErrorMessage name="nome" component="div" className={styles.errorPopup} />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="fornece">Fornece</label>
            <Field type="text" name="fornece" />
            <ErrorMessage name="fornece" component="div" className={styles.errorPopup} />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="localizacao">Localização</label>
            <Select
              options={opcoesCidades}
              onChange={(option) => setFieldValue('localizacao', option)}
              name="localizacao"
              instanceId="localizacao-select"
            />
            <ErrorMessage name="localizacao" component="div" className={styles.errorPopup} />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="periodoFornecimento.dataInicio">Período de Fornecimento - Início</label>
            <DatePicker
              selected={values.periodoFornecimento.dataInicio}
              onChange={(date: Date | null) => setFieldValue('periodoFornecimento.dataInicio', date)}
              dateFormat="dd/MM/yyyy"
            />
            <ErrorMessage name="periodoFornecimento.dataInicio" component="div" className={styles.errorPopup} />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="periodoFornecimento.dataFim">Período de Fornecimento - Fim</label>
            <DatePicker
              selected={values.periodoFornecimento.dataFim}
              onChange={(date: Date | null) => setFieldValue('periodoFornecimento.dataFim', date)}
              dateFormat="dd/MM/yyyy"
            />
            <ErrorMessage name="periodoFornecimento.dataFim" component="div" className={styles.errorPopup} />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioFornecedor;
