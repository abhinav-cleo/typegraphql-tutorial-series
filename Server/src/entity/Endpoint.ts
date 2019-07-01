import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { AppRef } from "./AppRef";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Endpoint extends BaseEntity {
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id:string;
        
    @Field()
    @Column({nullable:false})
    access_point_id:string;
        
    @Field()
    @Column()
    name:string | null;
        
    @Field()
    @CreateDateColumn()
    created:Date | null;
        
    @Field()
    @UpdateDateColumn()
    updated:Date | null;
        
    @Field()
    @Column()
    creator_id:string | null;
        
    @Field()
    @Column()
    admin:boolean | null;
        
    @Field()
    @Column()
    soft_deleted:boolean | null;
        
    @Field()
    @Column()
    type:string;
        
    @OneToOne(type => AppRef, app_ref=>app_ref.endpoint)
    appRef: AppRef | null;

}
