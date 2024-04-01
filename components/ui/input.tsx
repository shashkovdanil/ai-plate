import * as React from 'react'
import { TextInput } from 'react-native'

import { cn } from '~/lib/utils'

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'font-main rounded-md border border-input bg-background px-3 py-3.5 text-foreground file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground lg:text-sm',
        props.editable === false && 'opacity-50 web:cursor-not-allowed',
        className,
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }
