import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AppRef} from "./AppRef";
import {Integration} from "./Integration";
import {TpUserAccess} from "./TpUserAccess";
import {Field, ID, ObjectType} from "type-graphql";


@ObjectType()
@Entity()
export class TpDetail extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    tpid:string;
        
    @Field()
    @Column()
    tpname:string | null;
        
    @Field()
    @Column()
    id:string | null;
        
    @OneToMany(type=>AppRef, app_ref=>app_ref.tp)
    appRefs:AppRef[];
    
    @OneToMany(type=>Integration, integration=>integration.tp)
    integrations:Integration[];
    
    @OneToMany(type=>TpUserAccess, tp_user_access=>tp_user_access.tp)
    tpUserAccesss:TpUserAccess[];
    
}
