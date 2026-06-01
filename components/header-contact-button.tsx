'use client'

import { Button } from '@/components/ui/button'
import { useContactDialog } from '@/hooks/use-contact-dialog'
import { cn } from '@/lib/utils'
import { TiMessages } from 'react-icons/ti'

interface HeaderContactButtonProps {
  label: string
  className?: string
}

export function HeaderContactButton({ label, className }: HeaderContactButtonProps) {
  const { onOpen } = useContactDialog()

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'rounded-full border-primary bg-transparent px-3 text-primary hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground lg:px-4',
        className,
      )}
      aria-label={label}
      onClick={onOpen}
    >
      <TiMessages className="h-5 w-5 lg:hidden" aria-hidden />
      <span className="hidden lg:inline">{label}</span>
    </Button>
  )
}
