export interface ICoreUserMySuffix {
    id?: number;
    name?: string;
    password?: string;
    test?: string;
    status?: string;
}

export class CoreUserMySuffix implements ICoreUserMySuffix {
    constructor(public id?: number, public name?: string, public password?: string, public test?: string, public status?: string) {}
}
