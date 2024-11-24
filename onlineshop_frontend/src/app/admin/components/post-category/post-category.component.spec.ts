import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategoryComponent } from './post-category.component';

describe('PostCategoryComponent', () => {
  let component: PostCategoryComponent;
  let fixture: ComponentFixture<PostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
