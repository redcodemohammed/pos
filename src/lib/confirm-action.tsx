import { SquareCheckBig } from 'lucide-react'
import { toast } from 'sonner'

export function confirmAction(title: string, { onClick, label }: { onClick: () => void; label: string }, id?: string) {
  return toast(title, {
    id,
    action: {
      label,
      onClick
    },
    position: 'top-center',
    duration: 2000,
    icon: <SquareCheckBig />
  })
}
