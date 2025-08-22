# Usa imagem oficial do Node
FROM node:20

# Cria diretório de trabalho
WORKDIR /app

# Copia diretório de trabalho
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build

# Expões a porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD [ "npm", "start" ]