import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeUpRoomComponent } from './make-up-room.component';

describe('MakeUpRoomComponent', () => {
  let component: MakeUpRoomComponent;
  let fixture: ComponentFixture<MakeUpRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeUpRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeUpRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
