import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { AlertFeedbackType } from '@cali/common-models';

@Component({
  selector: 'cali-feedback-types-selector-ui',
  templateUrl: './feedback-types-selector-ui.component.html',
  styleUrls: ['./feedback-types-selector-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackTypesSelectorUiComponent {
  @Input() alertFeedbackType: AlertFeedbackType | null = null;

  @Output() alertFeedbackTypeChange = new EventEmitter<AlertFeedbackType>();
}
