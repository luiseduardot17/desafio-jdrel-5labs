import { Formik, Field, Form, ErrorMessage, FormikProps } from 'formik';
import React, { useRef } from 'react';
import { NavigateFunction } from 'react-router-dom';
import * as Yup from 'yup';
import http from '../../services/viacep';
import ICheckoutForm from '../../interfaces/ICheckoutForm';
import { readDbFile, writeDbFile } from '../../utils/dbUtils';
import { saveOrder } from "../../utils/orderUtils";
import vehicleStore from '../../stores/VehicleStore';

const CheckoutForm = ({ navigate }: { navigate: NavigateFunction }) => {
    const formikRef = useRef<FormikProps<ICheckoutForm>>(null!);
    const validationSchema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
        telefone: Yup.string().required('O telefone é obrigatório'),
        documento: Yup.string().required('O CPF/CNPJ é obrigatório'),
        cep: Yup.string().required('O CEP é obrigatório'),
        numero: Yup.string().required('O número é obrigatório'),
    });

    const getAddressByCep = async (cep: string) => {
        try {
            const response = await http.get(`${cep}/json/`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao obter dados de endereço');
        }
    };

    const handleBlurCep = async (event: React.FocusEvent<HTMLInputElement>) => {
        const cep = event.target.value.replace(/\D/g, '');

        if (cep.length === 8) {
            try {
                const data = await getAddressByCep(cep);

                formikRef.current.setFieldValue('logradouro', data.logradouro || '');
                formikRef.current.setFieldValue('bairro', data.bairro || '');
                formikRef.current.setFieldValue('cidade', data.localidade || '');
                formikRef.current.setFieldValue('uf', data.uf || '');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCheckout = () => {
        vehicleStore.clearCart(); // Esvaziar o carrinho
    };

    const handleSubmit = async () => {
        if (formikRef.current) {
            const values = formikRef.current.values;
            console.log('Compra efetuada!');
            console.log(values);
            handleCheckout();

            const db = readDbFile();
            db.push(values);
            writeDbFile(db);
            saveOrder(values);
            navigate('/success');
        }
    };

    return (
        <Formik
            innerRef={formikRef}
            initialValues={{
                nome: '',
                email: '',
                telefone: '',
                documento: '',
                cep: '',
                logradouro: '',
                numero: '',
                complemento: '',
                cidade: '',
                bairro: '',
                uf: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <Field type="text" id="nome" name="nome" />
                    <ErrorMessage name="nome" component="div" />
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>
                <div>
                    <label htmlFor="telefone">Telefone:</label>
                    <Field type="phone" id="telefone" name="telefone" />
                    <ErrorMessage name="telefone" component="div" />
                </div>
                <div>
                    <label htmlFor="documento">CPF/CNPJ:</label>
                    <Field type="text" id="documento" name="documento" />
                    <ErrorMessage name="documento" component="div" />
                </div>
                <div>
                    <label htmlFor="cep">CEP:</label>
                    <Field type="text" id="cep" name="cep" onBlur={handleBlurCep} />
                    <ErrorMessage name="cep" component="div" />
                </div>
                <div>
                    <label htmlFor="logradouro">Endereço:</label>
                    <Field type="text" id="logradouro" name="logradouro" component="input" />
                    <ErrorMessage name="logradouro" component="div" />
                </div>
                <div>
                    <label htmlFor="numero">Número:</label>
                    <Field type="text" id="numero" name="numero" />
                    <ErrorMessage name="numero" component="div" />
                </div>
                <div>
                    <label htmlFor="complemento">Complemento:</label>
                    <Field type="text" id="complemento" name="complemento" component="input" />
                    <ErrorMessage name="complemento" component="div" />
                </div>
                <div>
                    <label htmlFor="cidade">Cidade:</label>
                    <Field type="text" id="cidade" name="cidade" component="input" />
                    <ErrorMessage name="cidade" component="div" />
                </div>
                <div>
                    <label htmlFor="bairro">Bairro:</label>
                    <Field type="text" id="bairro" name="bairro" component="input" />
                    <ErrorMessage name="bairro" component="div" />
                </div>
                <div>
                    <label htmlFor="uf">UF:</label>
                    <Field type="text" id="uf" name="uf" component="input" />
                    <ErrorMessage name="uf" component="div" />
                </div>
                <button type="submit">Enviar</button>
            </Form>
        </Formik>
    );
};

export default CheckoutForm;



