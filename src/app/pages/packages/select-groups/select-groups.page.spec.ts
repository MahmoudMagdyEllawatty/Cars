import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectGroupsPage } from './select-groups.page';

describe('SelectGroupsPage', () => {
  let component: SelectGroupsPage;
  let fixture: ComponentFixture<SelectGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGroupsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
