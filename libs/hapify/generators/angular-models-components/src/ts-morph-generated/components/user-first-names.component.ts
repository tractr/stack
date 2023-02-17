import { ChangeDetectionStrategy, Component, OnInit, Optional, Self } from "@angular/core";
import { AbstractControl, FormControl, FormsModule, NgControl, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { UserFirstNameValidator } from "@poc/angular-models-validators";
import { BaseControlValueAccessorComponent } from "@trxn/angular-tools";
import { UserFirstNameUiComponent } from "@trxn/angular-ui";
import { UserFirstNameValidatorModule } from "@poc/angular-models-validators";
import { CommonModule } from "@angular/common";

@Component({
        standalone: true,
        imports: [
          SelectUiComponent,
          AngularModelsValidatorsModule,
          CommonModule,
          ReactiveFormsModule,
          FormsModule,
        ],
        selector: 'poc-user-first-names',
        templateUrl: './user-first-names.component.html',
        styleUrls: ['./user-first-names.component.less'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [],
        })
export class UserFirstNameComponent extends BaseControlValueAccessorComponent implements OnInit {
    control: FormControl = new FormControl('');

    constructor(public userFirstNameValidator: UserFirstNameValidator, @Self() @Optional() public override ngControl?: NgControl) {
        super(ngControl);
    }

    override get validator(): (control: AbstractControl) => ValidationErrors | null {
        return this.userFirstNameValidator.validate;
    }
}
