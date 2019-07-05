import {User} from "../../entity/User";
import * as jwt from "jsonwebtoken";

export class UserHelpers {
    public static readonly JWT_SECRET = "@QEGTUI";

    public static getToken(parent: User): string {
        return jwt.sign(JSON.parse(JSON.stringify(parent)), UserHelpers.JWT_SECRET, {
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
        }).toString();
    }
}
