import { MigrationInterface, QueryRunner } from "typeorm"

export class createUserTable1671353740433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE IF NOT EXISTS users
                (
                    user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
                    email character varying(100) NOT NULL,
                    password character varying(500) NOT NULL,
                    first_name character varying(100) NOT NULL,
                    last_name character varying(100) NOT NULL,
                    email_verified boolean NOT NULL DEFAULT false,
                    is_deleted boolean NOT NULL DEFAULT false,
                    email_verification_token character varying(1000),
                    password_recovery_token character varying(1000),
                    created_at timestamp(0) with time zone NOT NULL DEFAULT now(),
                    updated_at timestamp(0) with time zone NOT NULL DEFAULT now(),
                    deleted_at timestamp(0) with time zone,
                    CONSTRAINT users_pkey PRIMARY KEY (user_id)
                )
            `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users`);
    }

}
