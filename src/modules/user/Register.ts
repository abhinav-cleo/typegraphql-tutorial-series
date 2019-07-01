import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
@Resolver()
export class RegisterResolver {

    @Query(() => [User], { name: "users", nullable: true, description: "Register Service Status" })
    async registerStatus(): Promise<User[]>{
        return User.find()
    }

    @Mutation(() => User, { name: "registerUser", nullable: true, description: "Register User" })
    async registerUser(
        @Arg("input") input: RegisterInput
    ): Promise<User> {
        const {firstName, lastName, email, password} = input;
        const hashedPassword = await bcrypt.hash(password,12);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword
        }).save();
        return user;
    }
}