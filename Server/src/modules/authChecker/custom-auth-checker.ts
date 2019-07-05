import {AuthChecker} from "type-graphql";
import {CustomContext} from "../customContext/customContext";
import * as jwt from "jsonwebtoken";
import {UserHelpers} from "../user/UserHelpers";
import {GraphQLError} from "graphql";

export const customAuthChecker: AuthChecker<CustomContext> = async (
    {context}
) => {
    const bearerHeader = context.req.header('Authorization') || context.req.header('authorization');
    if (!bearerHeader) {
        return false;
    }
    const token = bearerHeader.split(' ')[1];
    if (!token) {
        return false;
    }

    try {
        await jwt.verify(token, UserHelpers.JWT_SECRET);
        return true;
    } catch (e) {
        throw new GraphQLError('Invalid token');
    }


};