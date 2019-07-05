import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TpDetail} from "./TpDetail";
import {Field, ID, ObjectType} from "type-graphql";

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
