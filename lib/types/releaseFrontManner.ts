export type ReleaseFrontManner = {
  version?: string,
  release?: string,
  id?: string,
  title?: string,
  icon?: string,
  metaTitle?: string,
  metaDescription?: string,
  pkgName?: string,
  gitUrl?: string,
} & Record<string, unknown>
