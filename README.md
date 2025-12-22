## cmd to run in dev mode after prisma schema update

npx prisma migrate dev --name added_new_features

## cmd to run in prod

npx prisma migrate

## V-IMP to generate new prisma client after a table create/delete/alter

npx prisma generate

## cmd to run seed file - prisma\seed.ts to populate db with initial data

npx prisma db seed

## include all api routes in global api error handler like

apiGlobalErrorHandler(async (request)=>{})

## if route is rate limited then wrap it inside withRateLimit handler like

apiGlobalErrorHandler(withRateLimit(async (request)=>{}))

## Enable row level security to all tables in supabase cmd -

DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT schemaname, tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format(
      'ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY;',
      r.schemaname,
      r.tablename
    );
  END LOOP;
END $$;
