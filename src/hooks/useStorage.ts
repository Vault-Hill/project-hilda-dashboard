/* eslint-disable @typescript-eslint/no-explicit-any */
import { isJson } from '../utils'

export const useStorage = (
  type: 'local' | 'session'
): {
  removeItem: (key: string) => void
  getItem: (key: string) => any
  setItem: (data: Record<string, any>, config?: { skip: boolean }) => void
} => {
  const storages = {
    local: window.localStorage,
    session: window.sessionStorage
  }

  const storage = storages[type]

  function getItem<T = any>(key: string) {
    const item = storage.getItem(key)
    if (item === null) return null
    return !isJson(item) ? item : (JSON.parse(item) as T)
  }

  function setItem(data: Record<string, any>, config?: { skip: boolean }) {
    if (config?.skip) return
    const keys = Object.keys(data)
    // eslint-disable-next-line array-callback-return
    keys.map((key) => {
      if (typeof data[key] === 'string') {
        storage.setItem(key, data[key])
      } else {
        storage.setItem(key, JSON.stringify(data[key]))
      }
    })
  }

  function removeItem(key: string) {
    storage.removeItem(key)
  }

  return { getItem, setItem, removeItem }
}