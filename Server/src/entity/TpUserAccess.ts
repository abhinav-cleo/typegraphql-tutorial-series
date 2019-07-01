import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {TpDetail} from "./TpDetail";
import { ObjectType, ID, Field } from "type-graphql";

@ObjectType()
@Entity()
export class TpUserAccess extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id:string;
        
    @ManyToOne(type=>TpDetail, tp_detail=>tp_detail.tpUserAccesss,{  nullable:false, })
    @JoinColumn()
    tp:TpDetail | null;

    @Field()
    @Column()
    username:string | null;
        
    @Field()
    @Column()
    has_permission:boolean | null;
        
}
