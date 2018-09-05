export interface ICustomerBankMySuffix {
    id?: number;
    fix?: string;
    status?: string;
    bankId?: number;
    customerId?: number;
}

export class CustomerBankMySuffix implements ICustomerBankMySuffix {
    constructor(public id?: number, public fix?: string, public status?: string, public bankId?: number, public customerId?: number) {}
}
