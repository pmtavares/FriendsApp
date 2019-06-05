import { Photo } from './Photo';

export interface User
{
    id: number;
    username: string;
    nickName: string;
    age: number;
    gender: string;
    createdAt: Date;
    lastActive: DataCue;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}