import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from './customer-my-suffix.service';
import { ICustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';
import { CustomerBankMySuffixService } from 'app/entities/customer-bank-my-suffix';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-customer-my-suffix-update',
    templateUrl: './customer-my-suffix-update.component.html'
})
export class CustomerMySuffixUpdateComponent implements OnInit {
    private _customer: ICustomerMySuffix;
    isSaving: boolean;

    parents: ICustomerMySuffix[];

    banks: ICustomerBankMySuffix[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private customerService: CustomerMySuffixService,
        private customerBankService: CustomerBankMySuffixService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
        this.customerService.query({ filter: 'customer-is-null' }).subscribe(
            (res: HttpResponse<ICustomerMySuffix[]>) => {
                if (!this.customer.parentId) {
                    this.parents = res.body;
                } else {
                    this.customerService.find(this.customer.parentId).subscribe(
                        (subRes: HttpResponse<ICustomerMySuffix>) => {
                            this.parents = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.customerBankService.query({ filter: 'customer-is-null' }).subscribe(
            (res: HttpResponse<ICustomerBankMySuffix[]>) => {
                if (!this.customer.bankId) {
                    this.banks = res.body;
                } else {
                    this.customerBankService.find(this.customer.bankId).subscribe(
                        (subRes: HttpResponse<ICustomerBankMySuffix>) => {
                            this.banks = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(this.customerService.create(this.customer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerMySuffix>>) {
        result.subscribe((res: HttpResponse<ICustomerMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCustomerById(index: number, item: ICustomerMySuffix) {
        return item.id;
    }

    trackCustomerBankById(index: number, item: ICustomerBankMySuffix) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get customer() {
        return this._customer;
    }

    set customer(customer: ICustomerMySuffix) {
        this._customer = customer;
    }
}
