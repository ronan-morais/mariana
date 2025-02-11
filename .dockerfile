# Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app

# Copia os arquivos de configuração e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código e gera a build
COPY . .
RUN npm run build

# Etapa de execução
FROM node:18-alpine
WORKDIR /app

# Copia a build gerada para a imagem final
COPY --from=builder /app .

# Exponha a porta que seu servidor irá escutar (ajuste se necessário)
EXPOSE 4321

# Inicia o servidor
CMD ["npm", "start"]
