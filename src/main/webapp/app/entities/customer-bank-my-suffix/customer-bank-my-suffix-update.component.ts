import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';
import { CustomerBankMySuffixService } from './customer-bank-my-suffix.service';

@Component({
    selector: 'jhi-customer-bank-my-suffix-update',
    templateUrl: './customer-bank-my-suffix-update.component.html'
})
export class CustomerBankMySuffixUpdateComponent implements OnInit {
    private _customerBank: ICustomerBankMySuffix;
    isSaving: boolean;

    constructor(private customerBankService: CustomerBankMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customerBank }) => {
            this.customerBank = customerBank;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.customerBank.id !== undefined) {
            this.subscribeToSaveResponse(this.customerBankService.update(this.customerBank));
        } else {
            this.subscribeToSaveResponse(this.customerBankService.create(this.customerBank));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerBankMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ICustomerBankMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get customerBank() {
        return this._customerBank;
    }

    set customerBank(customerBank: ICustomerBankMySuffix) {
        this._customerBank = customerBank;
    }
}
