import type { PropsWithChildren } from 'react'
import { Text } from 'react-native'

import { cx } from '../utils/cx'

type Props = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  className?: string
}

export const font = 'MartianMono_500Medium'

export function Typography({
  variant = 'p',
  children,
  className = '',
}: PropsWithChildren<Props>) {
  return (
    <Text
      className={cx(
        'text-left font-main text-lg',
        {
          'mb-1 text-lg': variant === 'h6',
          'mb-1 text-xl': variant === 'h5',
          'mb-2 font-main600 text-2xl': variant === 'h4',
          'mb-2 font-main600 text-3xl': variant === 'h3',
          'mb-3 font-main800 text-4xl': variant === 'h2',
          'mb-3 pt-1 font-main800 text-5xl': variant === 'h1',
        },
        className,
      )}
    >
      {children}
    </Text>
  )
}
