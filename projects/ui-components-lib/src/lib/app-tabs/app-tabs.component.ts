import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { TabsModule } from "primeng/tabs";
import { AppTabs } from "./app-tab.interface";
import { IcoMoonIconComponent } from "../ico-moon-icon/ico-moon-icon.component";
import { TranslateModule } from "@ngx-translate/core";
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-tabs",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TabsModule, RouterLink, RouterOutlet, IcoMoonIconComponent, TranslateModule],
  templateUrl: "./app-tabs.component.html",
  styleUrl: "./app-tabs.component.scss"
})
export class AppTabsComponent implements OnInit {
  @Input() tabs: AppTabs;
  @Input() tabsStyle: "basic" | "primary_light" | "primary" = "basic";
  @Input() responsive = false;
  activeTabIndex = 0;
  constructor(private route: ActivatedRoute, private router: Router) {}

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
    if (!this.tabs.isRouted) return;
    const selectedTab = this.tabs.items[index];
    if (selectedTab && !selectedTab.disabled) {
      this.router.navigate([selectedTab.link], { relativeTo: this.route });
    }
  }
}
