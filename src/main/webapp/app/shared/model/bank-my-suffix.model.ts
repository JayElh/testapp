export interface IBankMySuffix {
    id?: number;
    code?: string;
    name?: string;
    test?: string;
    status?: string;
}

export class BankMySuffix implements IBankMySuffix {
    constructor(public id?: number, public code?: string, public name?: string, public test?: string, public status?: string) {}
}
