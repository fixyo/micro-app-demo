import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export interface TagviewState {
  cachedViews: string[]
  visitedViews: TagView[]
}

export const state: TagviewState = {
  cachedViews: [],
  visitedViews: []
}
