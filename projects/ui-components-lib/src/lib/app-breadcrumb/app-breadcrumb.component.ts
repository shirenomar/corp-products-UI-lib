import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { filter } from 'rxjs';
import { BreadCrumbExtraData, BreadcrumbItem } from './app-breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './app-breadcrumb.component.html',
  styleUrl: './app-breadcrumb.component.scss',
  standalone: true,
  imports: [CommonModule, Breadcrumb, RouterModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppBreadcrumbComponent implements OnInit {
  @Input() items: BreadcrumbItem[] | undefined;
  isShownBreadcrumb: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    if (this.items) {
      this.isShownBreadcrumb = true;
      return;
    }
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((e) => {
      // remove duplicates
      this.items = (this._createBreadcrumbs(this.activatedRoute.root) as BreadcrumbItem[]).filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t.label === item.label && t.routerLink === item.routerLink)
      );
      this._checkHiddenBreadcrumb();
      this._checkEmpty();
    });
  }

  private _checkHiddenBreadcrumb() {
    const activeBreadcrumb = this.items?.find((item) => {
      return item.routerLink === this.router.url;
    });
    this.isShownBreadcrumb = !!activeBreadcrumb?.isShown;
  }

  private _createBreadcrumbs(
    activatedRoute: ActivatedRoute,
    routerLink = '',
    breadcrumbs: MenuItem[] = []
  ): any {
    const children: ActivatedRoute[] = activatedRoute.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        routerLink += `/${routeURL}`;
      }

      let label = child.snapshot.data['breadcrumb'];
      const notClickableBreadcrumb = !!child.snapshot.data['notClickableBreadcrumb'];
      const isShownBreadcrumb = !!child.snapshot.data['isShownBreadcrumb'];
      const extraBreadcrumbs: BreadCrumbExtraData[] = child.snapshot.data['extraBreadcrumbs'] || [];
      if (!(typeof label === 'undefined' || label === null)) {
        const data = activatedRoute.snapshot.firstChild?.data || {};
        // Resolve dynamic breadcrumb label
        if (label && label.startsWith('[') && label.endsWith(']')) {
          label = this._getRecursiveKey(data, label.slice(1, -1).split('.'));
        }

        // Resolve dynamic URL parts
        const resolveDynamicUrl = (route: string): string => {
          return route.replace(
            /\[([^\]]+)]/g,
            (_, key) => this._getRecursiveKey(data, key.split('.')) || ''
          );
        };

        const mainBreadcrumb: MenuItem = {
          label,
          routerLink,
          data,
          notClickableBreadcrumb,
          isShownBreadcrumb,
        };

        // Process extra breadcrumbs
        const beforeBreadcrumbs: MenuItem[] = [];
        const afterBreadcrumbs: MenuItem[] = [];

        extraBreadcrumbs.forEach((extra) => {
          let extraLabel = extra.label || '';
          if (extraLabel.startsWith('[') && extraLabel.endsWith(']')) {
            extraLabel = this._getRecursiveKey(data, extraLabel.slice(1, -1).split('.'));
          }

          const extraUrl = resolveDynamicUrl(extra.routerLink || '');

          const extraBreadcrumb: MenuItem = { ...extra, label: extraLabel, routerLink: extraUrl };

          if (extra.position === 'before') {
            beforeBreadcrumbs.push(extraBreadcrumb);
          } else {
            afterBreadcrumbs.push(extraBreadcrumb);
          }
        });

        // Merge breadcrumbs
        breadcrumbs.push(...beforeBreadcrumbs, mainBreadcrumb, ...afterBreadcrumbs);
      }
      return this._createBreadcrumbs(child, routerLink, breadcrumbs);
    }
  }

  private _checkEmpty() {
    if (!this.items) return;
    const lastBreadcrumbVisibility = this.items[this.items.length - 1].isShown;
    this.items = this.items.filter((b) => b.label !== '');
    this.items[this.items.length - 1].isShown = lastBreadcrumbVisibility;
  }

  private _getRecursiveKey(obj: Record<string, any>, keys: string[]): any | undefined {
    if (keys.length === 0) {
      return undefined;
    }

    const [currentKey, ...remainingKeys] = keys;
    if (currentKey in obj) {
      if (remainingKeys.length > 0) {
        return this._getRecursiveKey(obj[currentKey], remainingKeys);
      }
      return obj[currentKey];
    }
    return undefined;
  }
}
