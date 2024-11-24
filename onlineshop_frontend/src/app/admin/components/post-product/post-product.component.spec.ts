import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProductComponent } from './post-product.component';

describe('PostProductComponent', () => {
  let component: PostProductComponent;
  let fixture: ComponentFixture<PostProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
