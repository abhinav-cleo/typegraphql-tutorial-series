import {IsOptional, IsString, Length} from "class-validator";
import {Field, InputType} from "type-graphql";
import {TpDetail} from "../../entity/TpDetail";

@InputType({ description: "Register New User" })
export class TradingPartnerInput implements Partial<TpDetail> {
    @Field({ nullable: true })
    tpname?:string | null;

    @Field({ nullable: true })
    id?:string | null;
}