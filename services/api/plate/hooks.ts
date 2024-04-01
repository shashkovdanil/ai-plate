import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'

import { plate } from './'

const today = new Date().toISOString()

export function usePlatesByDate() {
  const params = useLocalSearchParams()

  const date = useMemo(() => {
    if (typeof params.date === 'string') {
      return new Date(params.date).toISOString()
    }

    return today
  }, [params])

  return useQuery({
    queryKey: ['plate', date],
    queryFn: () => plate.getByDate(date),
  })
}

export function useCreatePlate() {
  const mutation = useMutation({
    mutationFn: plate.create,
  })

  return mutation
}

export function useRemovePlate() {
  const mutation = useMutation({
    mutationFn: plate.remove,
  })

  return mutation
}
