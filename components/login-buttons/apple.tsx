import type { ComponentProps } from 'react'

import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'

export function Apple(props: ComponentProps<typeof Button>) {
  return (
    <Button {...props}>
      <Text>Sign In with Apple</Text>
    </Button>
  )
}
