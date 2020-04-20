import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Step2Page } from './step2.page';

describe('Step2Page', () => {
  let component: Step2Page;
  let fixture: ComponentFixture<Step2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Step2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
