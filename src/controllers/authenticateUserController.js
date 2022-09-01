import pkgCrypt from 'bcryptjs';
import pkgJwt from 'jsonwebtoken';
import User from "../database/models/user.js"

const { compare } = pkgCrypt;
const { sign } = pkgJwt;

export default class AuthenticateUser{
    static async execute(request, response){
        const {email, password} = request.body
        
        try{
            const userAlreadExist = await User.findOne({
                where:{
                    email
                }
            })
            
            if(!userAlreadExist){
                return response.status(404).json({error: `${email} does not exists!`})
            }
            
            const matchPassword = await compare(password, userAlreadExist.password)

            if(!matchPassword){
                return response.status(401).json({error: "password invalid!"})
            }

            const token = sign({uuid: userAlreadExist.uuid}, "kenzie", {
                subject: toString(userAlreadExist.uuid),
                expiresIn: "10d"
            })
        
            return response.status(200).json({
                token
            })

        }catch({errors}){
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }

    }
}