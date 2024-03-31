import { TextInput } from 'react-native'
import type { TextInputProps } from 'react-native'

import { cx } from '../utils/cx'

export function Input({ className = '', ...rest }: TextInputProps) {
  return (
    <TextInput
      className={cx(
        'rounded-md border border-zinc-300 px-5 py-4 font-main text-base',
        className,
      )}
      {...rest}
    />
  )
}
