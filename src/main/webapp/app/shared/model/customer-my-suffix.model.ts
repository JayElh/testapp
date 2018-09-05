export interface ICustomerMySuffix {
    id?: number;
    name?: string;
    status?: string;
    parentId?: number;
    bankId?: number;
    userId?: number;
}

export class CustomerMySuffix implements ICustomerMySuffix {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public parentId?: number,
        public bankId?: number,
        public userId?: number
    ) {}
}
