import {UserValidationInput} from "./UserValidationInput";
import {isEqual} from "apollo-utilities/lib/util/isEqual";
import {UserOutput} from "./UserOutput";
import {User} from "../../entity/User";

export class UserHelpers {
    public static readonly JWT_SECRET = "@QEGTUI";
    public static isUserValid(userCredFromDB: UserValidationInput, userCredFromRequest): Boolean{
        return isEqual(userCredFromDB,userCredFromRequest);
    }

    public static toResponseObject(user: User): UserOutput {
        const {token, password, ...returnedUserObject} = user;
        return returnedUserObject;
    }
}
