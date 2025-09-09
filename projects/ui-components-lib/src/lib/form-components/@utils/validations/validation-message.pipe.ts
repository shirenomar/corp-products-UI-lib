import { inject, Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { FormValidationService } from "./form-validation.service";

@Pipe({
  name: "validationErrors",
  standalone: true,
  pure: true
})
export class ValidationErrorsPipe implements PipeTransform {
  private formValidationService = inject(FormValidationService);

  // allowed keys here to handle errors in case of cross-validators like startDate and endDate validators,
  // we pass this custom key to handle the error messages only for the allowed keys
  transform(errors: ValidationErrors | null, allowedKeys?: string[]): string[] {
    if (!errors) return [];

    return Object.keys(errors)
      .filter((errorKey) => !allowedKeys || allowedKeys.includes(errorKey)) // Filter errors if allowedKeys are provided
      .map((errorKey) => {
        return this.formValidationService.getErrorMessage(errorKey, errors[errorKey]);
      });
  }
}
