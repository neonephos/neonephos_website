// docs/.vitepress/theme/utils/linkUtils.ts
import { withBase } from 'vitepress'

export function isExternal(url: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(url)
}

export function resolveLink(url: string): string {
  return isExternal(url) ? url : withBase(url)
}

export function resolveSrc(src?: string): string {
  if (!src) return ''
  return src.startsWith('/') ? withBase(src) : src
}

export function transformInternalLinks(html: string): string {
  return html.replace(/<a\s+href="(\/[^"]*)"/g, (match, href) => {
    return `<a href="${withBase(href)}"`
  })
}