import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_authors_kind" AS ENUM('person', 'organization');
  CREATE TYPE "payload"."enum__authors_v_version_kind" AS ENUM('person', 'organization');
  ALTER TABLE "payload"."authors" ADD COLUMN "kind" "payload"."enum_authors_kind" DEFAULT 'person' NOT NULL;
  ALTER TABLE "payload"."_authors_v" ADD COLUMN "version_kind" "payload"."enum__authors_v_version_kind" DEFAULT 'person' NOT NULL;
  UPDATE "payload"."authors" SET "kind" = 'organization' WHERE "slug" = 'tavu-studio';
  UPDATE "payload"."_authors_v" SET "version_kind" = 'organization' WHERE "parent_id" IN (SELECT "id" FROM "payload"."authors" WHERE "slug" = 'tavu-studio');`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."authors" DROP COLUMN "kind";
  ALTER TABLE "payload"."_authors_v" DROP COLUMN "version_kind";
  DROP TYPE "payload"."enum_authors_kind";
  DROP TYPE "payload"."enum__authors_v_version_kind";`)
}
