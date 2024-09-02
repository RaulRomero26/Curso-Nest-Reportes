# Ejecutar en Dev

1. Clonar el repositorio
2. Instalar dependencias `npm install`
3. Clonar `evn.template` y renomrbar a `.env` y completar las variables de entorno
3. Levantar la base de datos `docker compose up -d`
4. Generar el Prisma Client  `npx prisma generate`
5. Ejecutar el proyecto `npm run start:dev`