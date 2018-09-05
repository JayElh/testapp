/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestAppTestModule } from '../../../test.module';
import { CoreUserMySuffixDetailComponent } from 'app/entities/core-user-my-suffix/core-user-my-suffix-detail.component';
import { CoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';

describe('Component Tests', () => {
    describe('CoreUserMySuffix Management Detail Component', () => {
        let comp: CoreUserMySuffixDetailComponent;
        let fixture: ComponentFixture<CoreUserMySuffixDetailComponent>;
        const route = ({ data: of({ coreUser: new CoreUserMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [CoreUserMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CoreUserMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CoreUserMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.coreUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
