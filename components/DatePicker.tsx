import DateTimePicker from '@react-native-community/datetimepicker'
import { useCallback, useState } from 'react'
import type { ComponentProps, PropsWithChildren } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'

type DateTimePickerProps = ComponentProps<typeof DateTimePicker>

type Props = {
  value: DateTimePickerProps['value']
  onChange: NonNullable<DateTimePickerProps['onChange']>
  closeAfterChange?: boolean
}

export function DatePicker({
  value,
  onChange,
  children,
  closeAfterChange = true,
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false)

  const handleChange = useCallback<Props['onChange']>(
    (...args) => {
      onChange(...args)

      if (closeAfterChange) {
        setOpen(false)
      }
    },
    [onChange, closeAfterChange],
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DateTimePicker
          mode="date"
          value={value}
          display="inline"
          onChange={handleChange}
        />
      </DialogContent>
    </Dialog>
  )
}
