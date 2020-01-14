import { Component, HostBinding, HostListener, InjectionToken, Inject } from '@angular/core';

export const TAB_STATE = new InjectionToken<boolean>('tabState');
export const ACTIVE_TAB = new InjectionToken<Function>('activeAction');

@Component({
  selector: 'tab-title-outlet',
  template: `<ng-content></ng-content>`,
  host: {class: 'tabs__title'}
})
export class TabTitleOutletComponent {

  @HostBinding('class.tabs__title--active')
  isActive: boolean;

  constructor(@Inject(TAB_STATE) private state: boolean, @Inject(ACTIVE_TAB) private onActive: Function) {
    this.isActive = this.state;
  }

  @HostListener('click')
  activeTab(): void {
    this.onActive();
  }

}
