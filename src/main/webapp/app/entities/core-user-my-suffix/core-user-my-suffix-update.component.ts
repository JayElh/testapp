import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';
import { CoreUserMySuffixService } from './core-user-my-suffix.service';

@Component({
    selector: 'jhi-core-user-my-suffix-update',
    templateUrl: './core-user-my-suffix-update.component.html'
})
export class CoreUserMySuffixUpdateComponent implements OnInit {
    private _coreUser: ICoreUserMySuffix;
    isSaving: boolean;

    constructor(private coreUserService: CoreUserMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ coreUser }) => {
            this.coreUser = coreUser;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.coreUser.id !== undefined) {
            this.subscribeToSaveResponse(this.coreUserService.update(this.coreUser));
        } else {
            this.subscribeToSaveResponse(this.coreUserService.create(this.coreUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICoreUserMySuffix>>) {
        result.subscribe((res: HttpResponse<ICoreUserMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get coreUser() {
        return this._coreUser;
    }

    set coreUser(coreUser: ICoreUserMySuffix) {
        this._coreUser = coreUser;
    }
}
