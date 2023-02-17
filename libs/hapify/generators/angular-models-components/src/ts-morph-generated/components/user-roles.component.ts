import { ChangeDetectionStrategy, Component, OnInit, Optional, Self } from "@angular/core";
import { AbstractControl, FormControl, FormsModule, NgControl, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { UserRoleValidator } from "@poc/angular-models-validators";
import { BaseControlValueAccessorComponent } from "@trxn/angular-tools";
import { UserRoleUiComponent } from "@trxn/angular-ui";
import { UserRoleValidatorModule } from "@poc/angular-models-validators";
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
        selector: 'poc-user-roles',
        templateUrl: './user-roles.component.html',
        styleUrls: ['./user-roles.component.less'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [],
        })
export class UserRoleComponent extends BaseControlValueAccessorComponent implements OnInit {
    control: FormControl = new FormControl('');

    constructor(public userRoleValidator: UserRoleValidator, @Self() @Optional() public override ngControl?: NgControl) {
        super(ngControl);
    }

    override get validator(): (control: AbstractControl) => ValidationErrors | null {
        return this.userRoleValidator.validate;
    }
}
