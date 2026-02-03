export interface IUser {
    id: string;
    email: string;
    create_at : string;
    profile: {
        name: string;
        profile_pic: string;        
    };
}