import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
@Resolver()
export class RegisterResolver {

    @Query(() => String, { name: "registerServiceStatusCheck", nullable: true, description: "Register Service Status" })
    async registerStatus() {
        return "Good To Register Some Data";
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