import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IImagesUrl, NewImagesUrl } from '../images-url.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IImagesUrl for edit and NewImagesUrlFormGroupInput for create.
 */
type ImagesUrlFormGroupInput = IImagesUrl | PartialWithRequiredKeyOf<NewImagesUrl>;

type ImagesUrlFormDefaults = Pick<NewImagesUrl, 'id' | 'menuGroups' | 'menus' | 'meals' | 'ingredients' | 'recipes'>;

type ImagesUrlFormGroupContent = {
  id: FormControl<IImagesUrl['id'] | NewImagesUrl['id']>;
  name: FormControl<IImagesUrl['name']>;
  urlAddress: FormControl<IImagesUrl['urlAddress']>;
  explanation: FormControl<IImagesUrl['explanation']>;
  type: FormControl<IImagesUrl['type']>;
  createdDate: FormControl<IImagesUrl['createdDate']>;
  menuGroups: FormControl<IImagesUrl['menuGroups']>;
  menus: FormControl<IImagesUrl['menus']>;
  meals: FormControl<IImagesUrl['meals']>;
  ingredients: FormControl<IImagesUrl['ingredients']>;
  recipes: FormControl<IImagesUrl['recipes']>;
};

export type ImagesUrlFormGroup = FormGroup<ImagesUrlFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ImagesUrlFormService {
  createImagesUrlFormGroup(imagesUrl: ImagesUrlFormGroupInput = { id: null }): ImagesUrlFormGroup {
    const imagesUrlRawValue = {
      ...this.getFormDefaults(),
      ...imagesUrl,
    };
    return new FormGroup<ImagesUrlFormGroupContent>({
      id: new FormControl(
        { value: imagesUrlRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(imagesUrlRawValue.name),
      urlAddress: new FormControl(imagesUrlRawValue.urlAddress),
      explanation: new FormControl(imagesUrlRawValue.explanation),
      type: new FormControl(imagesUrlRawValue.type),
      createdDate: new FormControl(imagesUrlRawValue.createdDate),
      menuGroups: new FormControl(imagesUrlRawValue.menuGroups ?? []),
      menus: new FormControl(imagesUrlRawValue.menus ?? []),
      meals: new FormControl(imagesUrlRawValue.meals ?? []),
      ingredients: new FormControl(imagesUrlRawValue.ingredients ?? []),
      recipes: new FormControl(imagesUrlRawValue.recipes ?? []),
    });
  }

  getImagesUrl(form: ImagesUrlFormGroup): IImagesUrl | NewImagesUrl {
    return form.getRawValue() as IImagesUrl | NewImagesUrl;
  }

  resetForm(form: ImagesUrlFormGroup, imagesUrl: ImagesUrlFormGroupInput): void {
    const imagesUrlRawValue = { ...this.getFormDefaults(), ...imagesUrl };
    form.reset(
      {
        ...imagesUrlRawValue,
        id: { value: imagesUrlRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ImagesUrlFormDefaults {
    return {
      id: null,
      menuGroups: [],
      menus: [],
      meals: [],
      ingredients: [],
      recipes: [],
    };
  }
}
