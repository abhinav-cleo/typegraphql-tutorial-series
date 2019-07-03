import {IsEmail} from "class-validator";
import {Field, InputType} from "type-graphql";
import {User} from "../../entity/User";

@InputType({description: "Login a User."})
export class UserValidationInput implements Partial<User> {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    password?: string;
}