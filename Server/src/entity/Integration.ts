import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {IntegrationBlueprint} from "./IntegrationBlueprint";
import {TpDetail} from "./TpDetail";
import {ParticipatingAppEndpoint} from "./ParticipatingAppEndpoint";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Integration extends BaseEntity {
    @Field(()=> ID)
    @PrimaryGeneratedColumn()
    id:string;
        
    @Field()
    @Column()
    name:string;
        
    @Field()
    @Column({ 
        nullable:true,
        length:355
        })
    description:string | null;
        
    @Field()
    @Column()
    status: string;
    
    @ManyToOne(type=>IntegrationBlueprint, integration_blueprint=>integration_blueprint.integrations,{  nullable:false, })
    @JoinColumn()
    integrationBlueprint:IntegrationBlueprint | null;

    @ManyToOne(type=>TpDetail, tp_detail=>tp_detail.integrations,{  })
    @JoinColumn()
    tp:TpDetail | null;
        
    @OneToMany(type=>ParticipatingAppEndpoint, participating_app_endpoint=>participating_app_endpoint.integration)
    participatingAppEndpoints:ParticipatingAppEndpoint[];
    
}
