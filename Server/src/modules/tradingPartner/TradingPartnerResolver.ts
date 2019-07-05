import {Resolver, Query, Mutation, Arg, Ctx, Authorized} from "type-graphql";
import { GraphQLError } from 'graphql';
import {TpDetail} from "../../entity/TpDetail";
import {TradingPartnerInput} from "./TradingPartnerInput";

@Resolver()
export class TradingPartnerResolver {

    @Authorized()
    @Query(() => [TpDetail], {name: "tradingPartners", nullable: true, description: "Get All TradingPartners "})
    async getTradingPartners(): Promise<TpDetail[]> {
        return TpDetail.find();
    }

    @Authorized()
    @Query(() => TpDetail, {name: "tradingPartner", nullable: true, description: "Get Trading Partner By Trading Partner " +
            "Name, Trading Partner Id or external Id"})
    async getTradingPartner(
        @Arg("identifier") identifier: String
    ): Promise<TpDetail> {
        const numID = +identifier;
        console.log(`numId ::: ${numID}`);
        if(!isNaN(numID)){
            return TpDetail.findOne({where: [
                    {tpname:identifier},
                    {tpid:identifier}
                ]});
        } else {
            return TpDetail.findOne({where: [
                    {id:identifier}
                ]});
        }

    }

    @Authorized()
    @Mutation(() => TpDetail, {name: "createPartner", nullable: true, description: "Create A Trading User"})
    async createTradingPartner(
        @Arg("input") input: TradingPartnerInput
    ): Promise<TradingPartnerInput> {
        const {tpname, id} = input;
        try{
            const tradingPartner = await TpDetail.create({
                tpname,
                id
            }).save();
            return tradingPartner;
        }catch (e) {
            throw new GraphQLError(e);
        }
    }

    @Mutation(() => TpDetail, {name: "updatePartner", nullable: true, description: "Update A Trading User"})
    async updateTradingPartner(
        @Arg("identifier") tpid: string,
        @Arg("input") input: TradingPartnerInput
    ): Promise<TradingPartnerInput> {
        try{
        console.log(`Trading Partner to be updated ::: ${tpid}`);
        console.log(`Update Data ::: ${JSON.stringify(input)}`);
        const tradingPartner = await TpDetail.findOne({where: {tpid}});
        console.log(`Existing Trading Partner ::: ${JSON.stringify(tradingPartner)}`);
        if(!tradingPartner){
            throw new GraphQLError(`Trading partner ${tpid} does not exists`);
        }
            const updateResult = await TpDetail.update(tpid,input);
            console.log(`updateResult ::: ${JSON.stringify(updateResult)}`);
            const updatedTradingPartner = await TpDetail.findOne({where: {tpid}});
            return updatedTradingPartner;
        }catch (e) {
            console.error(`Error ::: ${JSON.stringify(e)}`);
            throw new GraphQLError(e);
        }

    }
}