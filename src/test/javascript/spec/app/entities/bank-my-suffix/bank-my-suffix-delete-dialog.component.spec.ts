/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestAppTestModule } from '../../../test.module';
import { BankMySuffixDeleteDialogComponent } from 'app/entities/bank-my-suffix/bank-my-suffix-delete-dialog.component';
import { BankMySuffixService } from 'app/entities/bank-my-suffix/bank-my-suffix.service';

describe('Component Tests', () => {
    describe('BankMySuffix Management Delete Component', () => {
        let comp: BankMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<BankMySuffixDeleteDialogComponent>;
        let service: BankMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [BankMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(BankMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BankMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
