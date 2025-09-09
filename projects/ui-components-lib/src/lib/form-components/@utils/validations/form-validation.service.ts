import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InterpolationParameters } from '@ngx-translate/core';
import { BasicErrorKeysEnum, ErrorsWithValuesKeysEnum } from './error-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  private translate = inject(TranslateService);

  private getTranslation(key: string, interpolateParams?: InterpolationParameters): string {
    return this.translate.instant(`VALIDATION.${key}`, interpolateParams);
  }

  getErrorMessage(errorKey: string, errorValue: any): string {
    if (this.isBasicErrorKey(errorKey)) {
      return this.getTranslation(BasicErrorKeysEnum[errorKey as keyof typeof BasicErrorKeysEnum]);
    }

    if (this.isErrorWithValueKey(errorKey)) {
      return this.getErrorWithValueMessage(
        errorKey as keyof typeof ErrorsWithValuesKeysEnum,
        errorValue
      );
    }

    return this.getTranslation(BasicErrorKeysEnum.default);
  }

  // Basic error keys are the keys that don't have any values to interpolate. like required, email, etc.
  private isBasicErrorKey(key: string): key is keyof typeof BasicErrorKeysEnum {
    return Object.keys(BasicErrorKeysEnum).includes(key as BasicErrorKeysEnum);
  }

  // Error keys with values are the keys that have values to interpolate. like minlength, maxlength, etc.
  private isErrorWithValueKey(key: string): key is keyof typeof ErrorsWithValuesKeysEnum {
    return Object.keys(ErrorsWithValuesKeysEnum).includes(key as ErrorsWithValuesKeysEnum);
  }

  private getErrorWithValueMessage(
    errorKey: keyof typeof ErrorsWithValuesKeysEnum,
    errorValue: any
  ): string {
    const messages: Record<keyof typeof ErrorsWithValuesKeysEnum, (value: any) => string> = {
      minlength: (val) =>
        this.getTranslation(ErrorsWithValuesKeysEnum.minlength, {
          requiredLength: val?.requiredLength,
          actualLength: val?.actualLength,
        }),
      maxlength: (val) =>
        this.getTranslation(ErrorsWithValuesKeysEnum.maxlength, {
          requiredLength: val?.requiredLength,
          actualLength: val?.actualLength,
        }),
      min: (val) => this.getTranslation(ErrorsWithValuesKeysEnum.min, { min: val?.min }),
      max: (val) => this.getTranslation(ErrorsWithValuesKeysEnum.max, { max: val?.max }),
      maxSize: (val) =>
        this.getTranslation(ErrorsWithValuesKeysEnum.maxSize, { size: val?.requiredLength }),
      maxFiles: (val) =>
        this.getTranslation(ErrorsWithValuesKeysEnum.maxFiles, { size: val?.requiredLength }),
      allowedTypes: (val) =>
        this.getTranslation(ErrorsWithValuesKeysEnum.allowedTypes, { types: val?.join(', ') }),
    };

    return messages[errorKey](errorValue);
  }
}
