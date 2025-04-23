import BaseService from "../../services/base.service.js";
import UserModel from "./user.model.js";

class UserService extends BaseService{
     constructor(){
            super(UserModel)
        }
}

const userSvc = new UserService()
export default userSvc;