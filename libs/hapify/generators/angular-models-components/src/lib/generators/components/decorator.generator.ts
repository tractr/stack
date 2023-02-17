import { plural } from "pluralize";
import { DecoratorStructure, OptionalKind } from "ts-morph";

import { Field, kebab, Model } from '@trxn/hapify-core';


export const generateDecorator = (model: Model, field: Field, projectScope:string): OptionalKind<DecoratorStructure>[] => [
    {
      name: 'Component',
      arguments: [
        `{
    standalone: true,
    imports: [
      SelectUiComponent,
      AngularModelsValidatorsModule,
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
    ],
    selector: '${projectScope}-${kebab(model.name)}-${kebab(plural(field.name))}',
    templateUrl: './${kebab(model.name)}-${kebab(plural(field.name))}.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
    }`,
      ],
    },
  ];