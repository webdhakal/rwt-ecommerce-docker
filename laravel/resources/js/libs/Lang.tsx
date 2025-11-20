import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'

export function __(key: string, replace: { [key: string]: string | number } = {}): string {
  const { language } = usePage<PageProps>().props

  let translation = language[key] ? language[key] : key

  Object.keys(replace).forEach(function (replaceKey) {
    translation = translation.replace(':' + replaceKey, replace[replaceKey].toString())
  })

  return translation
}
