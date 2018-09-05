export interface ICustomerMySuffix {
    id?: number;
    name?: string;
    status?: string;
    parentId?: number;
    coreuserId?: number;
}

export class CustomerMySuffix implements ICustomerMySuffix {
    constructor(public id?: number, public name?: string, public status?: string, public parentId?: number, public coreuserId?: number) {}
}
