import { MigrationInterface, QueryRunner } from "typeorm"

export class createUserEmailUniqueKey1671355969683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                ALTER TABLE IF EXISTS users
                ADD CONSTRAINT users_email_ukey UNIQUE (email);
            `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                ALTER TABLE IF EXISTS users
                DROP CONSTRAINT users_email_ukey;
            `
        );
    }

}
