import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';
import { CustomerBankMySuffixService } from './customer-bank-my-suffix.service';

@Component({
    selector: 'jhi-customer-bank-my-suffix-delete-dialog',
    templateUrl: './customer-bank-my-suffix-delete-dialog.component.html'
})
export class CustomerBankMySuffixDeleteDialogComponent {
    customerBank: ICustomerBankMySuffix;

    constructor(
        private customerBankService: CustomerBankMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerBankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerBankListModification',
                content: 'Deleted an customerBank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-bank-my-suffix-delete-popup',
    template: ''
})
export class CustomerBankMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerBank }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CustomerBankMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.customerBank = customerBank;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
