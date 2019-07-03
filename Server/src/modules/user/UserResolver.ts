import {Resolver, Query, Mutation, Arg, Ctx} from "type-graphql";
import { GraphQLError } from 'graphql';
import bcrypt from "bcryptjs";
import {User} from "../../entity/User";
import {UserInput} from "./UserInput";
import {UserValidationInput} from "./UserValidationInput";
import {Context} from "apollo-server-core/dist/types";

const HASH_SALT = 12;

@Resolver()
export class UserResolver {

    @Query(() => [User], {name: "users", nullable: true, description: "Get All Users"})
    async getUsers(): Promise<User[]> {
        return User.find()
    }

    @Query(() => User, {name: "user", nullable: true, description: "Get User By Email"})
    async getUser(@Arg("email") email: String): Promise<User> {
        return User.findOne({where: {email}})
    }

    @Mutation(() => User, {name: "registerUser", nullable: true, description: "Register A User"})
    async registerUser(
        @Arg("input") input: UserInput,
        @Ctx() ctx: Context
    ): Promise<User> {
        const {firstName, lastName, email, password, title, company, is_enabled, registration_status} = input;
        const hashedPassword = await bcrypt.hash(password, HASH_SALT);
        const user = await User.create({
            firstName,
            lastName,
            email,
            title,
            company,
            is_enabled,
            registration_status,
            password: hashedPassword
        }).save();
        return user;
    }

    @Mutation(() => User, {name: "login", nullable: false, description: "Login as User"})
    async loginUser(
        @Arg("input") input: UserValidationInput,
        @Ctx() ctx: Context
    ): Promise<User> {
        console.log(`User Info ::: ${JSON.stringify(ctx)}`);
        const {email, password} = input;
        const user = await User.findOne({where: {email}});
        const passwordCheck = bcrypt.compareSync(password, user.password);
        const userCheck = email === user.email;
        console.log(`user::: ${JSON.stringify(user)}`);
        console.log(`passwordCheck::: ${passwordCheck}`);
        console.log(`userCheck::: ${userCheck}`);
        if(userCheck && passwordCheck){
            if(user.token){
                user.token(user)
            }
            return user;
        } else {
            throw new GraphQLError("Invalid User Credentials");
        }

    }
}