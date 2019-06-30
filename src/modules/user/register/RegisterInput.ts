import { MaxLength, Length, IsEmail, IsString } from "class-validator";
import { InputType, Field } from "type-graphql";
import { isEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput {
    @Field()
    @Length(1,30)
    firstName: string;

    @Field()
    @Length(1, 30)
    lastName: string;

    @Field()
    @IsEmail()
    @isEmailAlreadyExist({message:"email already exists"})
    email: string;

    @Field()
    password?: string;
}