import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import * as jwt from "jsonwebtoken";
import {UserHelpers} from "../modules/user/UserHelpers";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column({unique:true})
    email: string;

    @Field()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Column()
    password:string;

    @Field()
    @Column()
    title: string | null;


    @Field()
    @Column()
    company: string | null;


    @Field()
    @CreateDateColumn()
    created: Date;

    @Field()
    @Column()
    registration_status: string;

    @Field()
    @Column({
        nullable: false,
        default: () => "true"
    })
    is_enabled: boolean;

    @Field()
    @UpdateDateColumn()
    updated: Date;

    @Field({nullable:true})
    token: string;
}