import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Endpoint} from "./Endpoint";
import {AppType} from "./AppType";
import {TpDetail} from "./TpDetail";
import {ParticipatingAppEndpoint} from "./ParticipatingAppEndpoint";



@Entity()
export class AppRef extends BaseEntity{

    @OneToOne(type=>Endpoint, endpoint=>endpoint.appRef,{ primary:true, nullable:false, })
    @JoinColumn()
    endpoint:Endpoint | null;

    @ManyToOne(type=>AppType, app_type=>app_type.appRefs,{  nullable:false, })
    @JoinColumn()
    appType:AppType | null;

    @ManyToOne(type=>TpDetail, tp_detail=>tp_detail.appRefs,{  })
    @JoinColumn()
    tp:TpDetail | null;

    @OneToMany(type=>ParticipatingAppEndpoint, participating_app_endpoint=>participating_app_endpoint.appRef)
    participatingAppEndpoints:ParticipatingAppEndpoint[];
    
}
