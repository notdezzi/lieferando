npm i --force

npx prisma migrate dev --name init
npx prisma db seed

npm run dev