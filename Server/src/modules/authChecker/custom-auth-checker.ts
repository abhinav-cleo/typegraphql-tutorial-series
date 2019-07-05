import {AuthChecker} from "type-graphql";
import {CustomContext} from "../customContext/customContext";
import * as jwt from "jsonwebtoken";
import {UserHelpers} from "../user/UserHelpers";

export const customAuthChecker: AuthChecker<CustomContext> = async (
    {root, args, context, info}
) => {
    console.log(`root::: ${JSON.stringify(root)}`);
    console.log(`args::: ${JSON.stringify(args)}`);
    console.log(`info::: ${JSON.stringify(info)}`);
    console.log(`context::: ${JSON.stringify(context.req.headers)}`);
    const bearerHeader = context.req.header('authorization');
    if (!bearerHeader) {
        return false;
    }
    const token = bearerHeader.split(' ')[1];
    if (!token) {
        return false;
    }

    try{
        const decodedJwtToken = await jwt.verify(token, UserHelpers.JWT_SECRET);
        console.log(JSON.stringify(decodedJwtToken));
        return true;
    }catch (e) {
        throw new Error('Invalid token');
    }


};