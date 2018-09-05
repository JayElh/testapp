import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';

@Component({
    selector: 'jhi-customer-bank-my-suffix-detail',
    templateUrl: './customer-bank-my-suffix-detail.component.html'
})
export class CustomerBankMySuffixDetailComponent implements OnInit {
    customerBank: ICustomerBankMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerBank }) => {
            this.customerBank = customerBank;
        });
    }

    previousState() {
        window.history.back();
    }
}
