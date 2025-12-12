## cmd to run in dev mode after prisma schema update
npx prisma migrate dev --name added_new_features
## cmd to run in prod
npx prisma migrate
## V-IMP to generate new prisma client after a table create/delete/alter
npx prisma generate

## cmd to run seed file - prisma\seed.ts to populate db with initial data
npx prisma db seed