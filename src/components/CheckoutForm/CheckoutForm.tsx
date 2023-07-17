import { Formik, Field, Form, ErrorMessage, FormikProps } from 'formik';
import React, { useRef } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import * as Yup from 'yup';
import http from '../../services/viacep';
import ICheckoutForm from '../../interfaces/ICheckoutForm';
import { readDbFile, writeDbFile } from '../../utils/dbUtils';
import { saveOrder } from "../../utils/orderUtils";
import vehicleStore from '../../stores/VehicleStore';
import { FaBarcode } from 'react-icons/fa';
import style from './CheckoutForm.module.css';

const CheckoutForm = ({ navigate }: { navigate: NavigateFunction }) => {
    const formikRef = useRef<FormikProps<ICheckoutForm>>(null!);
    const validationSchema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
            .email('E-mail inválido')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'E-mail inválido')
            .required('O e-mail é obrigatório'),
        telefone: Yup.string().required('O telefone é obrigatório'),
        documento: Yup.string()
            .required('O CPF/CNPJ é obrigatório')
            .test('validacao-documento', 'Documento inválido', value => {
                if (!value) return false;
                const numericValue = value.replace(/\D/g, '');
                const isCPF = numericValue.length === 11;
                const isCNPJ = numericValue.length === 14;
                return isCPF || isCNPJ;
            }),
        cep: Yup.string().required('O CEP é obrigatório')
            .matches(/^\d{8}$/, 'CEP inválido')
            .test('cep-validation', 'CEP não encontrado', async function (value) {
                const cep = value.replace(/\D/g, '');

                if (cep.length === 8) {
                    try {
                        const data = await getAddressByCep(cep);

                        return !!data;
                    } catch (error) {
                        console.log(error);
                    }
                }

                return true;
            }),
        numero: Yup.string().required('O número é obrigatório'),
        paymentType: Yup.string().required('Selecione o tipo de pagamento'),
        cardNumber: Yup.string().test({
            name: 'cardNumber',
            exclusive: true,
            test: function (value) {
                const { paymentType } = this.parent;
                if (paymentType === 'cartao') {
                    return !!value && /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(value);
                }
                return true;
            },
            message: 'Número do cartão inválido',
        }),
        cardExpiration: Yup.string().test({
            name: 'cardExpiration',
            exclusive: true,
            test: function (value) {
                const { paymentType } = this.parent;
                if (paymentType === 'cartao') {
                    return !!value && /^(0[0-9]|1[0-2])\/(2[3-9]|3[0-5])$/.test(value);
                }
                return true;
            },
            message: 'Data de expiração inválida',
        }),
        cardName: Yup.string().test({
            name: 'cardName',
            exclusive: true,
            test: function (value) {
                const { paymentType } = this.parent;
                if (paymentType === 'cartao') {
                    return !!value;
                }
                return true;
            },
            message: 'Nome impresso é obrigatório',
        }).matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Por favor, insira somente letras e caracteres especiais'),
        cvv: Yup.string().test({
            name: 'cvv',
            exclusive: true,
            test: function (value) {
                const { paymentType } = this.parent;
                if (paymentType === 'cartao') {
                    return !!value && /^\d{3}$/.test(value);
                }
                return true;
            },
            message: 'CVV inválido',
        }),
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
                if (!data || data.erro) {
                    formikRef.current.setFieldError('cep', 'CEP não encontrado');
                  } else {
                formikRef.current.setFieldValue('logradouro', data.logradouro || '');
                formikRef.current.setFieldValue('bairro', data.bairro || '');
                formikRef.current.setFieldValue('cidade', data.localidade || '');
                formikRef.current.setFieldValue('uf', data.uf || '');
                  }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCheckout = () => {
        vehicleStore.clearCart();
    };

    const handleSubmit = async () => {
        if (formikRef.current) {
            const values = formikRef.current.values;
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
                paymentType: '',
                cardNumber: '',
                cardExpiration: '',
                cardName: '',
                cvv: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors }) => (
                <Form className={style.form}>
                    <div className={style.ellipse}></div>
                    <div className={style.infosCadastro}>
                        <h3>Dados cadastrais</h3>
                        <div>
                            <label htmlFor="nome">Nome</label>
                            <Field type="text" id="nome" name="nome" maxLength={50} />
                            <ErrorMessage name="nome" component="div" />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <Field type="text" id="email" name="email" placeholder="seuemail@outlook.com" />
                            <ErrorMessage name="email" component="div"/>
                        </div>
                        <div>
                            <label htmlFor="telefone">Telefone</label>
                            <Field type="phone" id="telefone" name="telefone" placeholder="Número com DDD" maxLength={12} onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                const input = e.currentTarget;
                                input.value = input.value.replace(/\D/g, '');
                            }} />
                            <ErrorMessage name="telefone" component="div" />
                        </div>
                        <div>
                            <label htmlFor="documento">CPF/CNPJ</label>
                            <Field type="text" id="documento" name="documento" maxLength={14} placeholder="Somente números" />
                            <ErrorMessage name="documento" component="div" />
                        </div>
                        <div>
                            <label htmlFor="cep">CEP</label>
                            <Field type="text" id="cep" name="cep" maxLength={8} onBlur={handleBlurCep} onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                const input = e.currentTarget;
                                input.value = input.value.replace(/\D/g, '');
                            }} />
                            {errors.cep && <div>{errors.cep}</div>}
                        </div>
                        <div>
                            <label htmlFor="logradouro">Endereço</label>
                            <Field type="text" id="logradouro" name="logradouro" component="input" disabled/>
                            <ErrorMessage name="logradouro" component="div" />
                        </div>
                        <div>
                            <label htmlFor="numero">Número</label>
                            <Field type="text" id="numero" name="numero" />
                            <ErrorMessage name="numero" component="div" />
                        </div>
                        <div>
                            <label htmlFor="complemento">Complemento</label>
                            <Field type="text" id="complemento" name="complemento" component="input" placeholder="Opcional" />
                            <ErrorMessage name="complemento" component="div" />
                        </div>
                        <div>
                            <label htmlFor="cidade">Cidade</label>
                            <Field type="text" id="cidade" name="cidade" component="input" disabled/>
                            <ErrorMessage name="cidade" component="div" />
                        </div>
                        <div>
                            <label htmlFor="bairro">Bairro</label>
                            <Field type="text" id="bairro" name="bairro" component="input" disabled/>
                            <ErrorMessage name="bairro" component="div" />
                        </div>
                        <div>
                            <label htmlFor="uf">UF</label>
                            <Field type="text" id="uf" name="uf" component="input" disabled/>
                            <ErrorMessage name="uf" component="div" />
                        </div>
                    </div>

                    <div className={style.infosPagamento}>
                        <h3>Informações de pagamento</h3>
                        <div className={style.paymentType}>
                            <label htmlFor="paymentType">Tipo de Pagamento:</label>
                            <Field as="select" id="paymentType" name="paymentType">
                                <option value="">Selecione</option>
                                <option value="boleto">Boleto</option>
                                <option value="cartao">Cartão de Crédito</option>
                            </Field>
                            <ErrorMessage name="paymentType" component="div" className={style.ErrorMessage}/>
                        </div>
                        {values.paymentType === 'boleto' && (
                            <div className={style.ContainerBoleto}>
                                <div><FaBarcode className={style.Boleto} /></div>
                                <span>O boleto estará disponível para pagamento assim que concluir a compra.</span>
                            </div>
                        )}
                        {values.paymentType === 'cartao' && (
                            <div className={style.infosCartao}>
                                <div>
                                    <label htmlFor="cardNumber">Número do Cartão</label>
                                    <Field type="text" id="cardNumber" name="cardNumber" maxLength={19} placeholder="____ ____ ____ ____"
                                        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                            const input = e.currentTarget;
                                            const value = input.value.replace(/\s/g, ''); // Remove todos os espaços em branco
                                            let formattedValue = '';
                                            for (let i = 0; i < value.length; i++) {
                                                if (i > 0 && i % 4 === 0) {
                                                    formattedValue += ' '; // Adiciona um espaço a cada 4 caracteres
                                                }
                                                formattedValue += value[i];
                                            }
                                            input.value = formattedValue;
                                        }} />
                                    <ErrorMessage name="cardNumber" component="div" className={style.ErrorMessage} />
                                </div>
                                <div>
                                    <label htmlFor="cardExpiration">Validade</label>
                                    <Field type="text" id="cardExpiration" name="cardExpiration" maxLength={5} placeholder="MM/AA" onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                        const input = e.currentTarget;
                                        const value = input.value.replace(/\D/g, '');
                                        let formattedValue = '';
                                        for (let i = 0; i < value.length; i++) {
                                            if (i > 0 && i % 2 === 0) {
                                                formattedValue += '/';
                                            }
                                            formattedValue += value[i];
                                        }
                                        input.value = formattedValue;
                                    }} />
                                    <ErrorMessage name="cardExpiration" component="div" className={style.ErrorMessage} />
                                </div>
                                <div>
                                    <label htmlFor="cardName">Nome Impresso</label>
                                    <Field type="text" id="cardName" name="cardName" placeholder="Igual do cartão" maxLength={26}/>
                                    <ErrorMessage name="cardName" component="div" className={style.ErrorMessage} />
                                </div>
                                <div>
                                    <label htmlFor="cvv">CVV</label>
                                    <Field type="text" id="cvv" name="cvv" maxLength={3} placeholder="Ex: 123" onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                        const input = e.currentTarget;
                                        input.value = input.value.replace(/\D/g, '');
                                    }} />
                                    <ErrorMessage name="cvv" component="div" className={style.ErrorMessage} />
                                </div>
                            </div>
                        )}
                        <div className={style.containerButton}>
                        <button type="submit" className={style.buttonFinalizar}>Finalizar compra</button>
                        <Link to='/cart'><button>Voltar</button></Link>
                        </div>
                    </div>

                </Form>
            )}
        </Formik>
    );
};

export default CheckoutForm;



