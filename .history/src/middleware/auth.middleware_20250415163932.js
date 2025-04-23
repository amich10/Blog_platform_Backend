
import jwt from "jsonwebtoken";

import {appConfig, userRoles} from '../config/constants.js'
import authSvc from "../modules/auth/auth.service.js";

const allowUsers = (roles = null) =>{
    return async (req,res,next) =>{
        try{
            let token = req.headers['authorization'] || null;
            if(!token){
                next({
                    code:401,
                    message:"Token not received or found",
                    status:"UNAUTHENTICATED"
                })
            }

            else{
                token = token.split(" ").pop()

                let verifiedToken = jwt.verify(token,appConfig.jwtSecret)

                if(verifiedToken.typ === 'access') {
                    const user = await authSvc.getSingleUserByFilter({
                        _id: verifiedToken.sub
                    })

                    if(!user){
                        next({
                            code:401,
                            message:"User not found",
                            status:"NOT_FOUND"
                        })
                    }else{
                        req.authUser = authSvc.publicProfileUser(user);
                        // console.log(user.role) //admin or other
                        if(!roles || user.role === userRoles.ADMIN){
                            next()
                        }
                        else{
                            if(roles.includes(user.role)){
                                next()
                            }else{
                                next({
                                    code:403,
                                    message:"You donot have access to this resource",
                                    status:"UNAUTHORIZED"
                                })
                            }
                        }
                    }
                }else{
                    next({
                        code:401,
                        message:"Invalid token type",
                        status:"UNAUTHENTICATED"
                    })
                }
            }
        }catch(exception){
            next({
                code:401,
                message:exception.message,
                status:"UNAUTHENTICATED"
            })
        }
    }
}

export default allowUsers