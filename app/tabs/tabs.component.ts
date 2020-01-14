import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentChecked,
  Injector
} from '@angular/core';

import { 
  TabTitleComponent,
  TabTitleOutletComponent,
  TAB_STATE,
  ACTIVE_TAB,
  TabContentComponent,
  TabContentOutletComponent
} from './components';


interface ITabTitleContext {
  injector: Injector
  content: any;
}

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements AfterContentChecked {

  @Input()
  public tabIndex: number = 0;

  @Output()
  public tabChanged: EventEmitter<number> = new EventEmitter<number>();

  public titlesContext: Array<ITabTitleContext> = [];

  public titleOutlet = TabTitleOutletComponent;
  public tabOutlet = TabContentOutletComponent;

  public currentTab: TabTitleComponent;

  @ContentChildren(TabTitleComponent, {descendants: true})
  private titles: QueryList<TabTitleComponent>;

  @ContentChildren(TabContentComponent, {descendants: true})
  private tabs: QueryList<TabContentComponent>;

  constructor(private injector: Injector) {
  }

  ngAfterContentChecked(): void {
    if (this.tabIndex >= this.titles.length) {
      this.tabIndex = 0;
    }

    this.currentTab = this.tabs.find((tab, index) => index === this.tabIndex);

    this.titlesContext = this.titles.map((title, index) => {
      return {
        injector: Injector.create({
          providers: [
            {provide: ACTIVE_TAB, useValue: () => this.activeTabByIndex(index)},
            {provide: TAB_STATE, useValue: index === this.tabIndex}
          ],
          parent: this.injector
        }),
        content: [[title.element.nativeElement]]
      }
    });
  }

  private activeTabByIndex(index: number): void {
    this.tabIndex = index;
    this.tabChanged.emit(this.tabIndex);
  }

}
