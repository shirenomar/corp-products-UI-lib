import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input, model, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Badge } from 'primeng/badge';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { IcoMoonIconComponent } from '../ico-moon-icon/ico-moon-icon.component';
import { AppTabs } from './app-tab.interface';

@Component({
  selector: 'app-tabs',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgTemplateOutlet,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Badge,
    TranslatePipe,
    RouterLink,
    RouterOutlet,
    IcoMoonIconComponent,
  ],
  templateUrl: './app-tabs.component.html',
  styleUrl: './app-tabs.component.scss',
})
export class AppTabsComponent implements OnInit {
  @Input() tabs: AppTabs;
  @Input() tabsStyle: 'basic' | 'primary_light' | 'primary' = 'basic';
  @Input() responsive = false;
  @Input() twoDigitCount: boolean;
  selectedTabIndex = model<number>(0);
  activeTabIndex = 0;
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.updateActiveTab();
    });
    // to be refactor
    this.updateActiveTab();
  }

  // Updates the active tab index based on the current route
  private updateActiveTab(): void {
    if (!this.tabs.isRouted) return;
    const currentUrl = this.router.url;
    const matchingTabIndex = this.tabs.items.findIndex((tab) => currentUrl.includes(tab.link));
    this.activeTabIndex = matchingTabIndex !== -1 ? matchingTabIndex : 0;
  }

  onTabChange(index: number): void {
    this.selectedTabIndex.set(index);

    if (!this.tabs.isRouted) return;
    const selectedTab = this.tabs.items[index];
    if (selectedTab && !selectedTab.disabled) {
      this.router.navigate([selectedTab.link], { relativeTo: this.route });
    }
  }

  getTabCount(count: number): string {
    if (!count) return '0';
    return this.twoDigitCount && count > 99 ? '99+' : count.toString();
  }
}
