'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type DropdownMenuContextValue = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  rootRef: React.RefObject<HTMLDivElement | null>
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(
  null,
)

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('DropdownMenu components must be used within DropdownMenu')
  }

  return context
}

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, rootRef }}>
      <div ref={rootRef} className="relative inline-block">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

type DropdownMenuTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}

export function DropdownMenuTrigger({
  asChild,
  children,
  onClick,
  ...props
}: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownMenuContext()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>)
    setOpen((prev) => !prev)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...props,
      'aria-haspopup': 'menu',
      'aria-expanded': open,
      'data-state': open ? 'open' : 'closed',
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        ;(children as React.ReactElement<any>).props?.onClick?.(event)
        handleClick(event)
      },
    })
  }

  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      data-state={open ? 'open' : 'closed'}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

type DropdownMenuContentProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export function DropdownMenuContent({
  className,
  align = 'center',
  sideOffset = 4,
  style,
  ...props
}: DropdownMenuContentProps) {
  const { open } = useDropdownMenuContext()

  const alignClass =
    align === 'end'
      ? 'right-0'
      : align === 'start'
        ? 'left-0'
        : 'left-1/2 -translate-x-1/2'

  if (!open) return null

  return (
    <div
      role="menu"
      data-state="open"
      data-side="bottom"
      className={cn(
        'absolute top-full z-[300] min-w-[8rem] overflow-hidden rounded-xl border border-border/70 dark:border-white/15 bg-popover p-1.5 text-popover-foreground shadow-2xl',
        'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150',
        alignClass,
        className,
      )}
      style={{ marginTop: sideOffset, ...style }}
      {...props}
    />
  )
}

type DropdownMenuItemProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean
  inset?: boolean
  onSelect?: () => void
}

export function DropdownMenuItem({
  asChild,
  className,
  children,
  onClick,
  onSelect,
  inset,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenuContext()

  const handleSelect = () => {
    onSelect?.()
    setOpen(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClick?.(event as React.MouseEvent<HTMLDivElement>)
    handleSelect()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect()
    }
  }

  const itemClassName = cn(
    'relative flex cursor-default select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    inset && 'pl-8',
    className,
  )

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...props,
      className: cn(itemClassName, (children as React.ReactElement<any>).props?.className),
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        ;(children as React.ReactElement<any>).props?.onClick?.(event)
        handleClick(event)
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
        ;(children as React.ReactElement<any>).props?.onKeyDown?.(event)
        handleKeyDown(event)
      },
    })
  }

  return (
    <div
      role="menuitem"
      tabIndex={0}
      className={itemClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('-mx-1 my-1 h-px bg-border dark:bg-white/20', className)} {...props} />
  )
}
