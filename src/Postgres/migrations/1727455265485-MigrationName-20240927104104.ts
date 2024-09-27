import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName202409271041041727455265485 implements MigrationInterface {
    name = 'MigrationName202409271041041727455265485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."persons_register_status_enum" AS ENUM('pending', 'completed')`);
        await queryRunner.query(`CREATE TABLE "persons" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "register_status" "public"."persons_register_status_enum" NOT NULL DEFAULT 'pending', "rfc" character varying(20) NOT NULL, "fiscal_name" character varying NOT NULL, "tax_regime" integer NOT NULL, "postal_code" integer NOT NULL, "name" character varying, CONSTRAINT "CHK_4772f739f135963ec79c6b629f" CHECK (postal_Code > 10000), CONSTRAINT "CHK_b05c0b5a5d4f8b3083d012b2a4" CHECK ("tax_regime" BETWEEN 600 AND 700), CONSTRAINT "CHK_ed8aa566f4394566cdc96316dd" CHECK (char_length(rfc) >= 13), CONSTRAINT "PK_ea768fc98e0ff51847c38622ef3" PRIMARY KEY ("rfc"))`);
        await queryRunner.query(`CREATE TYPE "public"."payments_register_status_enum" AS ENUM('pending', 'completed')`);
        await queryRunner.query(`CREATE TYPE "public"."payments_payment_type_enum" AS ENUM('rent', 'deposit')`);
        await queryRunner.query(`CREATE TYPE "public"."payments_payment_status_enum" AS ENUM('pending', 'completed', 'due')`);
        await queryRunner.query(`CREATE TABLE "payments" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "register_status" "public"."payments_register_status_enum" NOT NULL DEFAULT 'pending', "id" character varying(36) NOT NULL, "amount" integer NOT NULL, "date" TIMESTAMP NOT NULL, "payment_type" "public"."payments_payment_type_enum" NOT NULL DEFAULT 'rent', "payment_status" "public"."payments_payment_status_enum" NOT NULL DEFAULT 'pending', "contractId" character varying(36), CONSTRAINT "CHK_09b21130af8c45041721dcbd75" CHECK (amount > 0), CONSTRAINT "CHK_7d78ac13b7ccb0e24c73393be1" CHECK ("id" ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-9][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."houses_register_status_enum" AS ENUM('pending', 'completed')`);
        await queryRunner.query(`CREATE TABLE "houses" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "register_status" "public"."houses_register_status_enum" NOT NULL DEFAULT 'pending', "id" character varying(36) NOT NULL, "property_tax_account" integer NOT NULL, "alias" character varying, "ownerRfc" character varying(20), CONSTRAINT "CHK_664763cb153ace0c648378be42" CHECK ("id" ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-9][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'), CONSTRAINT "PK_ee6cacb502a4b8590005eb3dc8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."rents_register_status_enum" AS ENUM('pending', 'completed')`);
        await queryRunner.query(`CREATE TABLE "rents" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "register_status" "public"."rents_register_status_enum" NOT NULL DEFAULT 'pending', "id" character varying(36) NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "monthly_price" integer NOT NULL, "deposit" integer NOT NULL, "is_available" boolean NOT NULL, "houseId" character varying(36), "contractId" character varying(36), CONSTRAINT "REL_bd74a95bd80d8039ea8ddf58d8" UNIQUE ("contractId"), CONSTRAINT "CHK_40da9f0b3be752c6a13818fa52" CHECK (deposit > 0), CONSTRAINT "CHK_f9aece50a39c7bc451942318fb" CHECK (monthly_price > 0), CONSTRAINT "CHK_8554bd65ea6eaaff4b77ea62e1" CHECK ("id" ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-9][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'), CONSTRAINT "PK_43a9961f1448a8d75f9b25156ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."contracts_register_status_enum" AS ENUM('pending', 'completed')`);
        await queryRunner.query(`CREATE TABLE "contracts" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "register_status" "public"."contracts_register_status_enum" NOT NULL DEFAULT 'pending', "id" character varying(36) NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_Date" TIMESTAMP NOT NULL, "monthly_price" integer NOT NULL, "deposit" integer NOT NULL, "tenantRfc" character varying(20), "rentId" character varying(36), CONSTRAINT "REL_16ee4825177aa1dbca95b5bed2" UNIQUE ("rentId"), CONSTRAINT "CHK_5249075e00fce961bb31da8f0f" CHECK (deposit > 0), CONSTRAINT "CHK_cb472b3ee82651b2423817bfb4" CHECK (monthly_price > 0), CONSTRAINT "CHK_2b3c8f2a10fcaef217d79de8d9" CHECK ("id" ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-9][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'), CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_f74e4083db402dfc68a6def8992" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "houses" ADD CONSTRAINT "FK_140cdf47ce7820e93e6697bac79" FOREIGN KEY ("ownerRfc") REFERENCES "persons"("rfc") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rents" ADD CONSTRAINT "FK_c00c8f988d339ee183a989584b2" FOREIGN KEY ("houseId") REFERENCES "houses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rents" ADD CONSTRAINT "FK_bd74a95bd80d8039ea8ddf58d8f" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_84c042f2aefa5372ac99711dbed" FOREIGN KEY ("tenantRfc") REFERENCES "persons"("rfc") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_16ee4825177aa1dbca95b5bed27" FOREIGN KEY ("rentId") REFERENCES "rents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_16ee4825177aa1dbca95b5bed27"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_84c042f2aefa5372ac99711dbed"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP CONSTRAINT "FK_bd74a95bd80d8039ea8ddf58d8f"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP CONSTRAINT "FK_c00c8f988d339ee183a989584b2"`);
        await queryRunner.query(`ALTER TABLE "houses" DROP CONSTRAINT "FK_140cdf47ce7820e93e6697bac79"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_f74e4083db402dfc68a6def8992"`);
        await queryRunner.query(`DROP TABLE "contracts"`);
        await queryRunner.query(`DROP TYPE "public"."contracts_register_status_enum"`);
        await queryRunner.query(`DROP TABLE "rents"`);
        await queryRunner.query(`DROP TYPE "public"."rents_register_status_enum"`);
        await queryRunner.query(`DROP TABLE "houses"`);
        await queryRunner.query(`DROP TYPE "public"."houses_register_status_enum"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_payment_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_register_status_enum"`);
        await queryRunner.query(`DROP TABLE "persons"`);
        await queryRunner.query(`DROP TYPE "public"."persons_register_status_enum"`);
    }

}
