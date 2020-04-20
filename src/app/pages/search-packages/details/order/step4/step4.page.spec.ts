import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Step4Page } from './step4.page';

describe('Step4Page', () => {
  let component: Step4Page;
  let fixture: ComponentFixture<Step4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Step4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
