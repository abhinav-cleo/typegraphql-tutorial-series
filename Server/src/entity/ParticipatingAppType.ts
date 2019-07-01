import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {IntegrationBlueprint} from "./IntegrationBlueprint";
import { AppType } from "./AppType";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class ParticipatingAppType extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id:string;
        
    @ManyToOne(type=>IntegrationBlueprint, integration_blueprint=>integration_blueprint.participatingAppTypes,{  nullable:false, })
    @JoinColumn()
    integrationBlueprint:IntegrationBlueprint | null;

    @ManyToOne(type => AppType, app_type=>app_type.participatingAppTypes,{  nullable:false, })
    @JoinColumn()
    appType: AppType | null;

    @Field()
    @Column()
    is_configurable:boolean | null;
        
    @Field()
    @Column()
    display_order:number;
        
}
