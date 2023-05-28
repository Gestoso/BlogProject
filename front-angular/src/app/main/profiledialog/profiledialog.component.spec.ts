import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiledialogComponent } from './profiledialog.component';

describe('ProfiledialogComponent', () => {
  let component: ProfiledialogComponent;
  let fixture: ComponentFixture<ProfiledialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiledialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
