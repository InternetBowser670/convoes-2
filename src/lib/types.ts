export interface User {
    _id: string;
    username: string;
    first_name?: string;
    last_name?: string;
    image_url?: string;
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

