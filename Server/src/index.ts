import "reflect-metadata";
import {ApolloServer} from "apollo-server-express";
import Express from "express";
import {buildSchema} from "type-graphql";
import {createConnection} from "typeorm";

import {ServerStatus} from "./modules/server/ServerStatus";
import {UserResolver} from "./modules/user/UserResolver";
import {customAuthChecker} from "./modules/authChecker/custom-auth-checker";
import {TradingPartnerResolver} from "./modules/tradingPartner/TradingPartnerResolver";


const main = async () => {
    await createConnection();
    const PORT = 4000;
    const schema = await buildSchema({
        resolvers: [ServerStatus, UserResolver, TradingPartnerResolver],
        authChecker:customAuthChecker,
        emitSchemaFile: "schema.gql",
    });

    const apolloServer = new ApolloServer({
        schema,
        playground: true,
        context: ({ req }: any) => ({ req })
    });

    const app = Express();
    apolloServer.applyMiddleware({app});

    app.listen(PORT, () => {
        console.log(`GraphQl Server running at http://localhost:${PORT}/graphql`)
    })

};
main();