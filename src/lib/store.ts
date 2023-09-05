import { persisted } from 'svelte-local-storage-store'

export interface Cap {
    id: string
    label: string
    content: string
}

export const caps = persisted<Cap[]>('_keycap_caps', [])
