/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgendaListComponent } from './agenda-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AgendaService } from 'src/core/service/agenda.service';
import { off } from 'process';

fdescribe('AgendaListComponent', () => {
  let component: AgendaListComponent;
  let fixture: ComponentFixture<AgendaListComponent>;

  beforeEach((() => {
    //mockService = new AgendaService();
    TestBed.configureTestingModule({
      imports: [ HttpClientModule],
      declarations: [ AgendaListComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue:{
            params:of({})
          }
        },
        {provide:AgendaService, useValue: jasmine.createSpyObj<AgendaService>(
          'getAll',
          {getAll: of([])
            // getCount: of(currentCount),
            // increment: undefined,
            // decrement: undefined,
            // reset: undefined,
          }
        )}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('o numero e par', () =>{
  //   component.oNumeroEPar(2);
  //   let retornoTest = component.oNumeroEPar(3);
  //   expect(retornoTest).toContain("o numero não é par.")
  //   component.oNumeroEPar(2);
  // });
});
