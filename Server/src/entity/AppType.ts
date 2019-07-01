import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {AppRef} from "./AppRef";
import {ParticipatingAppType} from "./ParticipatingAppType";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class AppType extends BaseEntity{
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id:string;
        
    @Field()
    @Column()
    image_path:string;
        
    @Field()
    @Column()
    name:string;
        
    @Field()
    @Column()
    auth_type:string;
                
    @OneToMany(type=>AppRef, app_ref=>app_ref.appType)
    appRefs:AppRef[];
    
    @OneToMany(type=>ParticipatingAppType, participating_app_type=>participating_app_type.appType)
    participatingAppTypes:ParticipatingAppType[];
    
}
