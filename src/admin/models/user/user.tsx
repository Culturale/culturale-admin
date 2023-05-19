import { MongoId } from "../../types/types";

export interface User {
    id?: MongoId;
  username: string;
  name: string;
  password: string;
  email: string;
  profilePicture: string;
  phoneNumber: string;
  usertype: string;
  
  report: number;
}