import { Resolver, Query } from "type-graphql";

@Resolver()
export class ServerStatus {

    @Query(() => String, { name: "statusCheck", nullable: true, description: "Server Status" })
    async serverStatus() {
        return "I am alive and well";
    }
}