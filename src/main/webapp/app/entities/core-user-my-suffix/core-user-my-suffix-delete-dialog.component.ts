import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';
import { CoreUserMySuffixService } from './core-user-my-suffix.service';

@Component({
    selector: 'jhi-core-user-my-suffix-delete-dialog',
    templateUrl: './core-user-my-suffix-delete-dialog.component.html'
})
export class CoreUserMySuffixDeleteDialogComponent {
    coreUser: ICoreUserMySuffix;

    constructor(
        private coreUserService: CoreUserMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.coreUserService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'coreUserListModification',
                content: 'Deleted an coreUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-core-user-my-suffix-delete-popup',
    template: ''
})
export class CoreUserMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ coreUser }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CoreUserMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.coreUser = coreUser;
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
