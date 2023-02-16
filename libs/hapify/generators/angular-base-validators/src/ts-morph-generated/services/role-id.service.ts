import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";
import { AngularModelsValidatorsModule } from "AngularModelsValidatorsModule";
import { validateUserEmail } from "../validators";

@Injectable({
      providedIn: AngularModelsValidatorsModule,
    })
export class RoleIdService implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateRoleId(control);
    }
}
