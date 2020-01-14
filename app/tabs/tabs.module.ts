import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TabsComponent } from './tabs.component';
import {
  TabComponent,
  TabTitleComponent,
  TabContentOutletComponent,
  TabContentComponent,
  TabTitleOutletComponent
} from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TabsComponent,
    TabComponent,
    TabTitleComponent,
    TabTitleOutletComponent,
    TabContentComponent,
    TabContentOutletComponent
  ],
  exports: [
    TabsComponent,
    TabComponent,
    TabTitleComponent,
    TabContentComponent
  ],
  entryComponents: [
    TabTitleOutletComponent,
    TabContentOutletComponent
  ]
})
export class TabsModule {

}
