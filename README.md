![logoswve](https://github.com/luiseduardot17/desafio-jdrel-5labs/assets/102761201/06502bf7-dc68-4473-8328-52dca1eb705c)

<div style="text-align: center">
<h5>A minha página web oferece a oportunidade de explorar e conhecer os incríveis veículos de Star Wars, fornecidos pela API SWAPI. A plataforma simula uma loja online, permitindo que você tenha a experiência completa de compra. Você pode navegar pelos diversos veículos disponíveis, selecionar o seu favorito e prosseguir para o checkout. Ao finalizar a compra, você poderá desfrutar da emoção de ter o seu próprio veículo de Star Wars. Prepare-se para embarcar em aventuras galácticas e mergulhar no universo fascinante de Star Wars!</h5>

</div>


## 🧩 Tecnologias utilizadas:

- <a href="https://www.npmjs.com/package/axios" target="_blank">Axios</a>
- <a href="https://formik.org/" target="_blank">Formik</a>
- <a href="https://mobx.js.org/README.html" target="_blank">MobX</a>
- <a href="https://react.dev/" target="_blank">ReactJS</a>
- <a href="https://www.npmjs.com/package/react-dom" target="_blank">React Dom</a>
- <a href="https://www.npmjs.com/package/react-router-dom" target="_blank">React Router Dom</a>
- <a href="https://www.npmjs.com/package/react-scroll" target="_blank">React Scroll</a>
- <a href="https://react-icons.github.io/react-icons/" target="_blank">React Icons</a>
- <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>
- <a href="https://www.npmjs.com/package/yup?activeTab=readme" target="_blank">Yup</a>

## 📝 Sobre o desafio:
Desafio de entrega para Frontend
1. Consumir a api de star wars, que possui a documentação em:
https://swapi.dev/about;
2. Da API listar os veículos conforme a documentação;
3. Os veículos listados poderão ser adquiridos via checkout;
a. Ao selecionar um dos veículos, direcionar para o checkout
4. As exigências do check-out serão:
a. Informações Pessoais: nome, e-mail, telefone e cpf/cnpj;
b. Informações de Endereço: cep, endereço, numero, complemento,
cidade, bairro, uf;
c. Importante: cliente informa apenas o CEP e obtém os demais dados
da api viacep.com.br
d. Informações de pagamento: boleto ou cartão (número do cartão,
validade, nome impresso e cvv);
5. Os formulários do checkout devem possuir validação (e-mail, cpf/cnpj);
6. Exibir tela de sucesso após a compra ou toast de erro no caso de dados
inválidos;
7. Todos os dados serão mockados;
Tecnologias a utilizar: ReactJS, MobX, Typescript, Formik e Yup;
#

## 🚏 Rotas:
Página Inicial:
``` 
path= "/" Pode ser acessada clicando em "Início".
``` 
![localhost](https://github.com/luiseduardot17/desafio-jdrel-5labs/assets/102761201/53d9108a-b364-4cf8-8f2d-c42401235c1f)

Página do Veículos:
``` 
path= "/vehicles" Acessada clicando em "Veículos".
```
![localhost2](https://github.com/luiseduardot17/desafio-jdrel-5labs/assets/102761201/73124f42-41ba-4f83-8028-9bff6cbca5b9)
Página de Detalhes de um veículo:
``` 
path= "vehicles/:id" Acessada clicando no botão "Ver detalhes" de um veículo.
```
![localhost3](https://github.com/luiseduardot17/desafio-jdrel-5labs/assets/102761201/bb5fd1a3-b6f3-4d4f-b76e-27e19a857c53)
Página do Carrinho:
``` 
path="/cart" Acessada clicando no botão "Carrinho" ou em "Adicionar ao carrinho" na página de detalhes de um veículo.
```
![localhost4](https://github.com/luiseduardot17/desafio-jdrel-5labs/assets/102761201/65551e60-9036-45fc-8135-7725e77c29c1)
Página de Checkout:
```
path="/checkout" Acessado apenas depois de clicar no botão "Fechar Pedido" no carrinho.
```
![localhost5](https://github.com/luiseduardot17/desafio-jdrel-5labs/assets/102761201/783c719f-610b-4375-a177-d53438cec4ef)
Página de Sucesso da compra:
```
path="/success" Será direcionado apenas depois de concluir o checkout
```
![localhost6](https://github.com/luiseduardot17/desafio-jdrel-5labs/assets/102761201/3d3831ca-cf81-43aa-abea-d8c04dcd6d11)
#

## 🎲 Como visualizar os dados cadastrados:
1- Preencha o formulário de dados cadastrais na página de Checkout.

2- Após preencher e concluir a compra, abra o console do navegador. Geralmente, você pode fazer isso clicando com o botão direito do mouse na página e selecionando "Inspecionar" ou "Inspeção" e, em seguida, navegar para a guia "Aplicativo" ou "Application".

3- Na guia "Aplicativo", você encontrará uma seção chamada "Armazenamento" ou "Storage" no painel esquerdo.

4- Clique em "Armazenamento local" em "Armazenamento" para visualizar os dados armazenados.
Os dados mockados que foram salvos no Local Storage da aplicação devem ser exibidos na lista.

5- Clique em cada item para expandir e visualizar os detalhes dos dados armazenados, como nome, endereço, número de telefone e outras informações relevantes.

Lembre-se de que essa opção está disponível apenas no mesmo navegador em que os dados foram armazenados e não é compartilhada com outros navegadores ou dispositivos.
<div style="text-align: center">

![image](https://github.com/luiseduardot17/desafio-jdrel-5labs/assets/102761201/394de700-1eb7-4865-b186-66b784726779)

</div>


## 📥 Como instalar e usar o projeto:
Para instalar o projeto, com o Visual Studio Code, ou outro editor de sua preferência,
abra o terminal e clone o projeto:
``` 
git clone https://github.com/luiseduardot17/desafio-jdrel-5labs.git
```
Confirme se esta no diretório correto, utilizando o comando:
```
cd desafio-jdrel-5labs
```
No terminal, instale as dependências do projeto (Para isso você precisa ter o Node.js instalado):
```
npm install ou npm i
```
Finalmente, execute o projeto:
```
npm run dev
```
#

>  Esse é um desafio de [JDREL/5Labs](https://www.jdrel.com.br/)