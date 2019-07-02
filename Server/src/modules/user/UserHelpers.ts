import {UserValidationInput} from "./UserValidationInput";
import {isEqual} from "apollo-utilities/lib/util/isEqual";

export class UserHelpers {
    public static readonly JWT_SECRET = "@QEGTUI";
    public static isUserValid(userCredFromDB: UserValidationInput, userCredFromRequest): Boolean{
        return isEqual(userCredFromDB,userCredFromRequest);
    }
}
