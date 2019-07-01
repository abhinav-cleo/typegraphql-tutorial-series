import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Integration} from "./Integration";
import {ParticipatingAppType} from "./ParticipatingAppType";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class IntegrationBlueprint extends BaseEntity {
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id:string;
        
    @Field()
    @Column()
    name:string;
        
    @Field()
    @Column()
    description:string | null;
        
    @Field()
    @Column()
    display_order:number;
        
    @OneToMany(type=>Integration, integration=>integration.integrationBlueprint)
    integrations:Integration[];
    
    @OneToMany(type=>ParticipatingAppType, participating_app_type=>participating_app_type.integrationBlueprint)
    participatingAppTypes:ParticipatingAppType[];
    
}
