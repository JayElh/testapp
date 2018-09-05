import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';
import { CustomerBankMySuffixService } from './customer-bank-my-suffix.service';
import { IBankMySuffix } from 'app/shared/model/bank-my-suffix.model';
import { BankMySuffixService } from 'app/entities/bank-my-suffix';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix';

@Component({
    selector: 'jhi-customer-bank-my-suffix-update',
    templateUrl: './customer-bank-my-suffix-update.component.html'
})
export class CustomerBankMySuffixUpdateComponent implements OnInit {
    private _customerBank: ICustomerBankMySuffix;
    isSaving: boolean;

    banks: IBankMySuffix[];

    customers: ICustomerMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private customerBankService: CustomerBankMySuffixService,
        private bankService: BankMySuffixService,
        private customerService: CustomerMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customerBank }) => {
            this.customerBank = customerBank;
        });
        this.bankService.query({ filter: 'customerbank-is-null' }).subscribe(
            (res: HttpResponse<IBankMySuffix[]>) => {
                if (!this.customerBank.bankId) {
                    this.banks = res.body;
                } else {
                    this.bankService.find(this.customerBank.bankId).subscribe(
                        (subRes: HttpResponse<IBankMySuffix>) => {
                            this.banks = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.customerService.query({ filter: 'customerbank-is-null' }).subscribe(
            (res: HttpResponse<ICustomerMySuffix[]>) => {
                if (!this.customerBank.customerId) {
                    this.customers = res.body;
                } else {
                    this.customerService.find(this.customerBank.customerId).subscribe(
                        (subRes: HttpResponse<ICustomerMySuffix>) => {
                            this.customers = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBankById(index: number, item: IBankMySuffix) {
        return item.id;
    }

    trackCustomerById(index: number, item: ICustomerMySuffix) {
        return item.id;
    }
    get customerBank() {
        return this._customerBank;
    }

    set customerBank(customerBank: ICustomerBankMySuffix) {
        this._customerBank = customerBank;
    }
}
