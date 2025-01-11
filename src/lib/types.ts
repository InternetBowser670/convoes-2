export interface User {
    _id: string;
    username: string;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    desc?: string;
}

export interface ChatDocument {
    chatName: string;
    members: string[];
    privacyOption: string;
    chatDesc: string;
    chatPassword?: string;
    createdById: string;
    ownerId: string;
    usersAdded: number;
}


export interface Chat {
    _id: string;
    chatName: string;
    privacyOption: string;
    members: string[];
    chatPassword?: string;
    chatDesc?: string;
    ownerUsername: string;
    createdBy: string;
    ownerId: string;
    usersAdded: string;
}

export interface Version {
    vername: string;
    changes: string;
    date: string;
    changeType: string;
}

export interface Project {
    name: string;
    desc: string;
    date: string;
    prjType: string;
    imgUrl?: string;
    prjStatus: string;
    prjUrl?: string;
}

export interface SeeMoreProps {
    text: string;
    maxLength: number;
    className: string;
}