import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	firstName!: string;

	@Column({ unique: true, nullable: false })
	email!: string;

	@Column({ nullable: false })
	password!: string;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date = new Date();
}
