import {Resolver, Query, Authorized} from "type-graphql";

@Resolver()
export class ServerStatus {
    @Authorized()
    @Query(() => String, { name: "statusCheck", nullable: true, description: "Server Status" })
    async serverStatus() {
        return "I am alive and well";
    }
}