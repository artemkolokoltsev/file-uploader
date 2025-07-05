FROM node:20

WORKDIR /app

ARG VITE_BACKEND_API_URL

ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL

COPY . .

RUN npm install
RUN npm run build

RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
