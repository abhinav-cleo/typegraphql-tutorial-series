import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { ServerStatus } from "./modules/server/ServerStatus";
import { RegisterResolver } from "./modules/user/RegisterResolver";


const main = async () => {
    await createConnection();
    const PORT = 4000;
    const schema = await buildSchema({
        resolvers: [ServerStatus, RegisterResolver],
        emitSchemaFile: "schema.gql",
    });

    const apolloServer = new ApolloServer({ 
        schema,
        playground:true
     });

    const app = Express();
    apolloServer.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`GraphQl Server running at http://localhost:${PORT}/graphql`)
    })

}
main();