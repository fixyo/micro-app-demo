import { getSidebarStatus, getSize } from '@/utils/cookies'
import { getLocal } from '@/locales'

// eslint-disable-next-line no-shadow
export enum DeviceType {
  Mobile,
  Desktop
}

export interface AppState {
  device: DeviceType
  sidebar: {
    isOpen: boolean
    withAnimation: boolean
  }
  language: string
  size: string
}

export const state: AppState = {
  device: DeviceType.Desktop,
  sidebar: {
    isOpen: getSidebarStatus() !== 'closed',
    withAnimation: true
  },
  language: getLocal(),
  size: getSize() || 'medium'
}
