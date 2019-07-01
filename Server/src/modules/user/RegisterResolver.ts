import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
@Resolver()
export class RegisterResolver {

    @Query(() => [User], { name: "users", nullable: true, description: "Get All Users" })
    async getUsers(): Promise<User[]>{
        return User.find()
    }

    @Query(() => User, { name: "user", nullable: true, description: "Get User By Email" })
    async getUser(@Arg("email") email:String): Promise<User> {
        return User.findOne({ where: { email } })
    }

    @Mutation(() => User, { name: "registerUser", nullable: true, description: "Register A User" })
    async registerUser(
        @Arg("input") input: RegisterInput
    ): Promise<User> {
        const {firstName, lastName, email, password, title, company, is_enabled, registration_status} = input;
        const hashedPassword = await bcrypt.hash(password,12);
        const user = await User.create({
            firstName,
            lastName,
            email,
            title,
            company,
            is_enabled,
            registration_status,
            password:hashedPassword
        }).save();
        return user;
    }
}