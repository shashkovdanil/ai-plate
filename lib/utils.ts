import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toDate(something: unknown) {
  const today = new Date()

  try {
    if (typeof something === 'string') {
      return new Date(something)
    }

    return today
  } catch (e) {
    return today
  }
}

export function buildDateTitle(date: Date) {
  const today = new Date()

  if (dayjs(date).isSame(today, 'day')) {
    return 'Today'
  }

  if (dayjs(today).add(-1, 'day').isSame(date, 'day')) {
    return 'Yesterday'
  }

  if (dayjs(today).add(1, 'day').isSame(date, 'day')) {
    return 'Tomorrow'
  }

  return dayjs(date).format('MMM D, YYYY')
}

export function formatNumber(num: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  })
  return Number(formatter.format(num))
}
