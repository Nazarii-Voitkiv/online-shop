import { Component, effect, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FilterProductsFormContent,
  ProductFilter,
  ProductFilterForm,
  sizes,
} from '../../../admin/model/product.model';
import { ProductCategory } from '../../../admin/model/product.model';
import {
  FormBuilder,
  FormControl,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-products-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss',
})
export class ProductsFilterComponent implements OnChanges {
  sort = input<string>('createdDate,asc');
  size = input<string>();
  @Input() categories: ProductCategory[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categories'] && this.categories) {
      const categoryForm = this.buildCategoryFormControl();
      this.formFilterProducts.setControl('category', categoryForm);
    }
  }

  productFilter = output<ProductFilter>();
  formBuilder = inject(FormBuilder);

  constructor() {
    effect(() => this.updateSizeFormValue());
    effect(() => this.updateSortFormValue());
    this.formFilterProducts.valueChanges.subscribe(() =>
      this.onFilterChange(this.formFilterProducts.getRawValue())
    );
  }

  public getCategoryFormGroup(): FormRecord<FormControl<boolean>> {
    return this.formFilterProducts.get('category') as FormRecord<
      FormControl<boolean>
    >;
  }

  formFilterProducts =
    this.formBuilder.nonNullable.group<FilterProductsFormContent>({
      sort: new FormControl<string>(this.sort().split(',')[1], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      size: this.buildSizeFormControl(),
      category: this.buildCategoryFormControl(),
    });

  private buildCategoryFormControl(): FormRecord<FormControl<boolean>> {
    const categoryFormControl = this.formBuilder.nonNullable.record<
      FormControl<boolean>
    >({});
    for (const category of this.categories) {
      categoryFormControl.addControl(
        category.publicId!,
        new FormControl<boolean>(false, { nonNullable: true })
      );
    }
    return categoryFormControl;
  }

  private buildSizeFormControl(): FormRecord<FormControl<boolean>> {
    const sizeFormControl = this.formBuilder.nonNullable.record<
      FormControl<boolean>
    >({});
    for (const size of sizes) {
      sizeFormControl.addControl(
        size,
        new FormControl<boolean>(false, { nonNullable: true })
      );
    }
    return sizeFormControl;
  }

  private onFilterChange(filter: Partial<ProductFilterForm>) {
    const filterProduct: ProductFilter = {
      size: '',
      sort: [`createdDate,${filter.sort}`],
      category: '',
    };

    if (filter.size) {
      const sizes = Object.entries(filter.size);
      for (const [sizeKey, sizeValue] of sizes) {
        if (sizeValue) {
          filterProduct.size += filterProduct.size ? `,${sizeKey}` : sizeKey;
        }
      }
    }

    if (filter.category) {
      const selectedCategories = Object.entries(filter.category)
        .filter(([_, isSelected]) => isSelected)
        .map(([categoryId]) => categoryId);
      filterProduct.category = selectedCategories.join(',');
    }
    this.productFilter.emit(filterProduct);
  }

  public getSizeFormGroup(): FormRecord<FormControl<boolean>> {
    return this.formFilterProducts.get('size') as FormRecord<
      FormControl<boolean>
    >;
  }

  private updateSizeFormValue() {
    if (this.size()) {
      const sizes = this.size()!.split(',');
      for (const size of sizes) {
        this.getSizeFormGroup().get(size)!.setValue(true, { emitEvent: false });
      }
    }
  }

  private updateSortFormValue() {
    if (this.sort()) {
      this.formFilterProducts.controls.sort.setValue(
        this.sort().split(',')[1],
        { emitEvent: false }
      );
    }
  }

  protected onCheckboxChange(selectedKey: string | undefined) {
    if (!selectedKey) {
      return;
    }

    const categoryGroup = this.getCategoryFormGroup();

    const isChecked = categoryGroup.get(selectedKey)?.value;

    if (isChecked) {
      Object.keys(categoryGroup.controls).forEach(key => {
        categoryGroup.get(key)?.setValue(key === selectedKey, { emitEvent: false });
      });
    } else {
      categoryGroup.get(selectedKey)?.setValue(false, { emitEvent: false });
    }

    this.onFilterChange(this.formFilterProducts.getRawValue());
  }

  protected readonly sizes = sizes;
}
