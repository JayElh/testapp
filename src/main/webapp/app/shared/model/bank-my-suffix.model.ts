export interface IBankMySuffix {
    id?: number;
    code?: string;
    name?: string;
    status?: string;
    customerId?: number;
}

export class BankMySuffix implements IBankMySuffix {
    constructor(public id?: number, public code?: string, public name?: string, public status?: string, public customerId?: number) {}
}
