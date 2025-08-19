import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import CommitteeBoardThemeComponent from './components/CommitteeTilesThemeComponent.vue'
import CommitteeThemeComponent from './components/CommitteeThemeComponent.vue'
import ProjectTilesThemeComponent from './components/ProjectTilesThemeComponent.vue'
import ProjectThemeComponent from './components/ProjectThemeComponent.vue'
import ProjectsGalleryMinimalThemeComponent from './components/projects_minimal_theme_component.vue'
import MemberTilesThemeComponent from './components/MemberTilesThemeComponent.vue'
import LandingThemeComponent from './components/landing_theme_component.vue'
//import LinuxHeader from './linux_header.vue'
import './neonephos_override_theme.vue'
import NoSidebarThemeComponent from './components/no_sidebar_theme_component.vue'
import BlogThemeComponent from './components/blog_theme_component.vue'
import './neonephos_override_theme.css'
import BlogEntryThemeComponent from './components/blog_entry_theme_component.vue'
import EventsThemeComponent from './components/EventsThemeComponent.vue'
import LandingTilesThemeComponent from './components/landing_tiles_theme_component.vue'
import NeoNephosLayout from './neonephos_override_theme.vue'
import SubscriptionThemeComponent from './components/subscription_theme_component.vue'
import EventsTilesThemeComponent from './components/EventsTilesThemeComponent.vue'
import { createContentLoader } from 'vitepress'
import BlogGalleryTeaserThemeComponent from './components/blog_gallery_teaser_theme_component.vue'
import NewToNeoNephosButtonThemeComponent from './components/new_to_neonephos_button_theme_component.vue'
import ContactThemeComponent from './components/contact_theme_component.vue'
import NeoNephosIntroductionThemeComponent from './components/neonephos_introduction_theme_component.vue'
import MemberThemeComponent from './components/MemberThemeComponent.vue'
//https://ericgardner.info/notes/blogging-with-vitepress-january-2024

export default {
  extends: DefaultTheme,
  Layout: NeoNephosLayout,
  enhanceApp({ app }) {
    app.component('CommitteeBoardThemeComponent', CommitteeBoardThemeComponent)
    app.component('CommitteeThemeComponent', CommitteeThemeComponent)
    app.component('ProjectTilesThemeComponent', ProjectTilesThemeComponent)
    app.component('ProjectThemeComponent', ProjectThemeComponent)
    app.component('ProjectsGalleryMinimalThemeComponent', ProjectsGalleryMinimalThemeComponent)
    app.component('MemberTilesThemeComponent', MemberTilesThemeComponent)
    app.component('NoSidebarThemeComponent', NoSidebarThemeComponent)
    app.component('BlogThemeComponent', BlogThemeComponent)
    app.component('BlogEntryThemeComponent', BlogEntryThemeComponent)
    app.component('EventsThemeComponent', EventsThemeComponent)
    app.component('LandingThemeComponent', LandingThemeComponent)
    app.component('LandingTilesThemeComponent', LandingTilesThemeComponent)
    app.component('SubscriptionThemeComponent', SubscriptionThemeComponent)
    app.component('EventsTilesThemeComponent', EventsTilesThemeComponent)
    app.component('BlogGalleryTeaserThemeComponent', BlogGalleryTeaserThemeComponent)
    app.component('NewToNeoNephosButtonThemeComponent', NewToNeoNephosButtonThemeComponent)
    app.component('ContactThemeComponent', ContactThemeComponent)
    app.component('NeoNephosIntroductionThemeComponent', NeoNephosIntroductionThemeComponent)
    app.component('MemberThemeComponent', MemberThemeComponent)
  }
} satisfies Theme
