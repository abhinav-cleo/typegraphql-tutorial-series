import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";
import { Integration } from "./Integration";
import { AppRef } from "./AppRef";


@ObjectType()
@Entity()
export class ParticipatingAppEndpoint extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id:string;
        
    @ManyToOne(type=>AppRef, app_ref=>app_ref.participatingAppEndpoints,{  nullable:false, })
    @JoinColumn()
    appRef:AppRef | null;

    @ManyToOne(type=>Integration, integration=>integration.participatingAppEndpoints,{  nullable:false, })
    @JoinColumn()
    integration:Integration | null;

    @Field()
    @Column()
    is_configurable:boolean | null;
        
}
