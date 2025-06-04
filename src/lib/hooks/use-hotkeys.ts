'use client'

import { useHotkeys as useHotkeysLib } from 'react-hotkeys-hook'

type Options = {
  enabled?: boolean
  preventDefault?: boolean
  enableOnFormTags?: boolean | Array<'input' | 'textarea' | 'select'>
  enableOnContentEditable?: boolean
  combinationKey?: string
  splitKey?: string
  scopes?: string | string[]
  keyup?: boolean
  keydown?: boolean
  ignoreModifiers?: boolean
  ignoreEventWhen?: (e: KeyboardEvent) => boolean
}

export function useHotkeys(
  keys: string,
  callback: (event: KeyboardEvent, handler: any) => void,
  options: Options = {},
  deps: any[] = []
) {
  return useHotkeysLib(keys, callback, options, deps)
}