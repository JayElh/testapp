import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';

@Component({
    selector: 'jhi-core-user-my-suffix-detail',
    templateUrl: './core-user-my-suffix-detail.component.html'
})
export class CoreUserMySuffixDetailComponent implements OnInit {
    coreUser: ICoreUserMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ coreUser }) => {
            this.coreUser = coreUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
