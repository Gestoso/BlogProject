import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodepassComponent } from './codepass.component';

describe('CodepassComponent', () => {
  let component: CodepassComponent;
  let fixture: ComponentFixture<CodepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodepassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
