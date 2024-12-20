export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
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

