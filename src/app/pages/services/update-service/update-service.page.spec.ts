import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateServicePage } from './update-service.page';

describe('UpdateServicePage', () => {
  let component: UpdateServicePage;
  let fixture: ComponentFixture<UpdateServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
