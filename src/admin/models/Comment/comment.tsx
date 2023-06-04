import { MongoId } from "../../types/types";


export interface Comment{
    _id?: MongoId;
    authorId: string;
    eventId: string; 
    puntuation: number;
    comment?: string;    
    report: number; 
  }