import {UserValidationInput} from "./UserValidationInput";
import {isEqual} from "apollo-utilities/lib/util/isEqual";
import {UserOutput} from "./UserOutput";
import {User} from "../../entity/User";
import * as jwt from "jsonwebtoken";

export class UserHelpers {
    public static readonly JWT_SECRET = "@QEGTUI";
    public static isUserValid(userCredFromDB: UserValidationInput, userCredFromRequest): Boolean{
        return isEqual(userCredFromDB,userCredFromRequest);
    }

    public static toResponseObject(user: User): UserOutput {
        const {token, password, ...returnedUserObject} = user;
        return returnedUserObject;
    }

    public static getToken(parent: User): string {
        return jwt.sign(JSON.parse(JSON.stringify(parent)), UserHelpers.JWT_SECRET, {
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
        }).toString();
    }
}
