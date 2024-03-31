import type { PropsWithChildren } from 'react'
import { Pressable } from 'react-native'
import type { PressableProps } from 'react-native'

import { cx } from '../utils/cx'
import { Typography } from './Typography'

interface Props extends PressableProps {
  className?: string
}

export function Button({ children, ...rest }: PropsWithChildren<Props>) {
  return (
    <Pressable
      className={cx(
        'rounded-md bg-black px-5 py-4 transition-all active:bg-slate-700',
        rest.className,
      )}
      {...rest}
    >
      <Typography className="text-center text-white">{children}</Typography>
    </Pressable>
  )
}
