# Baixa a última versão da imagem
FROM node

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para dentro do container
COPY package*.json ./

# Instala os pacotes
RUN npm install

# Copia todo o restante da aplicação para dentro de /app no container
COPY . .

# Indica que o container utiliza a porta 3331
EXPOSE 3331

# Define o comando padrão que será executado ao iniciar o container
CMD ["npm", "run", "dev"]

