import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../components/member-edit/member-edit.component';

export const preventUnsavedGuard: CanDeactivateFn<MemberEditComponent> = (
  component: MemberEditComponent
) => {
  if (component.editForm?.dirty) {
    return confirm('Are you sure? Unsaved changes will be lost.');
  }

  return true;
};
