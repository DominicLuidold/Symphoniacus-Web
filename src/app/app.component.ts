import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';

const THEME_DARKNESS_SUFFIX = `-dark`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') activeThemeCssClass: string;
  isThemeDark = false;
  activeTheme: string;

  constructor(private overlayContainer: OverlayContainer) {
    this.defineColorScheme();
  }

  defineColorScheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches;
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => e.matches && this.activateDarkTheme());
    window.matchMedia('(prefers-color-scheme: light)').addListener(e => e.matches && this.activateLightTheme());

    if (isDarkMode) {
      this.activateDarkTheme();
    }
    if (isLightMode) {
      this.activateLightTheme();
    }
    if (isNotSpecified || hasNoSupport) {
      const hour = new Date().getHours();
      if (hour < 4 || hour >= 16) {
        this.activateDarkTheme();
      }
    }
  }

  activateLightTheme() {
    this.setActiveTheme('indigo-pink', false);
  }

  activateDarkTheme() {
    this.setActiveTheme('indigo-pink', true);
  }

  setActiveTheme(theme: string, darkness: boolean = null) {
    if (darkness === null) {
      darkness = this.isThemeDark;
    } else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) {
        return;
      }
    } else {
      this.isThemeDark = darkness;
    }

    this.activeTheme = theme;

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass)) {
      classList.replace(this.activeThemeCssClass, cssClass);
    } else {
      classList.add(cssClass);
    }

    this.activeThemeCssClass = cssClass;
  }
}
