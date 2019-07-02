import { MaxLength, Length, IsEmail, IsString, IsBoolean, IsOptional } from "class-validator";
import { InputType, Field } from "type-graphql";
import { isEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class UserInput {
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
    @Length(1, 30)
    title: string;


    @Field()
    @Length(1, 30)
    company: string;

    @Field()
    @Length(1, 30)
    registration_status: string;

    @Field()
    @IsBoolean()
    is_enabled: boolean;

    @Field()
    password?: string;
}