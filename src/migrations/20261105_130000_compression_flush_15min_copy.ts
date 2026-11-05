import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres';

// Data-only migration. The Compression Flush add-on changed from 20 to 15 minutes (studio, 2026-11).
// The seed text was fixed, but the live database still holds the old wording in globals (the
// Compression Therapy page), FAQ entries and blog posts (Lexical JSON), and their saved versions.
// This replaces ONLY these exact phrases, in every text / varchar / jsonb column of the schema:
//   "Compression Flush (20 min"                            -> "(15 min"
//   "20-minute Compression Flush"                          -> "15-minute"
//   "20-minute " + a Lexical text node "Compression Flush" (bold split) -> "15-minute "
//   "AED 50 (20 minutes, added"                            -> "(15 minutes, added"
//   "(20 minutes) can be added to any session for AED 50"  -> "(15 minutes) …"
// Nothing else is touched, so other "20 minute" text (e.g. the 20-minute foot soak) stays as it is.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  const schema = process.env.PAYLOAD_DB_SCHEMA || 'payload';
  if (!/^[a-z_][a-z0-9_]*$/.test(schema)) throw new Error(`Unsafe schema name: ${schema}`);
  // String.raw keeps the regex backslashes intact; the schema name is validated above.
  const statement = String.raw`
DO $mig$
DECLARE
  c record;
  expr text;
BEGIN
  FOR c IN
    SELECT table_name, column_name, data_type
    FROM information_schema.columns
    WHERE table_schema = 'SCHEMA_NAME'
      AND data_type IN ('text', 'character varying', 'jsonb')
      AND table_name NOT IN ('payload_migrations', 'users', 'users_sessions')
  LOOP
    expr := format(
      $f$regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(%1$s,
        'Compression Flush \(20 min', 'Compression Flush (15 min', 'g'),
        '20-minute Compression Flush', '15-minute Compression Flush', 'g'),
        '20-minute ("[^{}]*\}[[:space:]]*,[[:space:]]*\{[^{}]*"text":[[:space:]]*"Compression Flush)', '15-minute \1', 'g'),
        'AED 50 \(20 minutes, added', 'AED 50 (15 minutes, added', 'g'),
        '\(20 minutes\) can be added to any session for AED 50', '(15 minutes) can be added to any session for AED 50', 'g')$f$,
      CASE WHEN c.data_type = 'jsonb' THEN format('%I::text', c.column_name) ELSE format('%I', c.column_name) END
    );
    EXECUTE format(
      'UPDATE %I.%I SET %I = (%s)%s WHERE %I::text ~ %L',
      'SCHEMA_NAME', c.table_name, c.column_name, expr,
      CASE WHEN c.data_type = 'jsonb' THEN '::jsonb' ELSE '' END,
      c.column_name,
      '(Compression Flush \(20 min|20-minute|AED 50 \(20 minutes|\(20 minutes\) can be added)'
    );
  END LOOP;
END
$mig$;`.replaceAll('SCHEMA_NAME', schema);
  await db.execute(sql.raw(statement));
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Copy correction only; the old 20-minute wording is wrong, so there is nothing to restore.
}
