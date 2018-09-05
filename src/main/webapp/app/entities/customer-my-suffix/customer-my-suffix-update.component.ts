import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from './customer-my-suffix.service';
import { ICoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';
import { CoreUserMySuffixService } from 'app/entities/core-user-my-suffix';

@Component({
    selector: 'jhi-customer-my-suffix-update',
    templateUrl: './customer-my-suffix-update.component.html'
})
export class CustomerMySuffixUpdateComponent implements OnInit {
    private _customer: ICustomerMySuffix;
    isSaving: boolean;

    parents: ICustomerMySuffix[];

    coreusers: ICoreUserMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private customerService: CustomerMySuffixService,
        private coreUserService: CoreUserMySuffixService,
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
        this.coreUserService.query().subscribe(
            (res: HttpResponse<ICoreUserMySuffix[]>) => {
                this.coreusers = res.body;
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

    trackCoreUserById(index: number, item: ICoreUserMySuffix) {
        return item.id;
    }
    get customer() {
        return this._customer;
    }

    set customer(customer: ICustomerMySuffix) {
        this._customer = customer;
    }
}
