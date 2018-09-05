export interface ICustomerBankMySuffix {
    id?: number;
    fix?: string;
    status?: string;
}

export class CustomerBankMySuffix implements ICustomerBankMySuffix {
    constructor(public id?: number, public fix?: string, public status?: string) {}
}
