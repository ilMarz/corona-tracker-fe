import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelfeedComponent } from './travelfeed.component';

describe('TravelfeedComponent', () => {
  let component: TravelfeedComponent;
  let fixture: ComponentFixture<TravelfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
