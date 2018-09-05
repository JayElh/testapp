/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestAppTestModule } from '../../../test.module';
import { CoreUserMySuffixDeleteDialogComponent } from 'app/entities/core-user-my-suffix/core-user-my-suffix-delete-dialog.component';
import { CoreUserMySuffixService } from 'app/entities/core-user-my-suffix/core-user-my-suffix.service';

describe('Component Tests', () => {
    describe('CoreUserMySuffix Management Delete Component', () => {
        let comp: CoreUserMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CoreUserMySuffixDeleteDialogComponent>;
        let service: CoreUserMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [CoreUserMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(CoreUserMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CoreUserMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CoreUserMySuffixService);
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
