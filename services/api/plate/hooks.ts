import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'

import { plate } from './'
import type { UpdatePlate } from './entities'

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

export function usePlateById() {
  const params = useLocalSearchParams<{ id: string }>()

  const query = useQuery({
    queryKey: ['plate', params.id],
    queryFn: () => plate.getById(Number(params.id)),
  })

  return [query, Number(params.id)] as const
}

export function useCreatePlate() {
  const mutation = useMutation<void, Error, { prompt: string; date: string }>({
    mutationFn: ({ prompt, date }) => plate.create(prompt, date),
  })

  return mutation
}

export function useRemovePlate() {
  const mutation = useMutation({
    mutationFn: plate.remove,
  })

  return mutation
}

export function useCreatePlateManually() {
  const mutation = useMutation({
    mutationFn: plate.createManually,
  })

  return mutation
}

export function useUpdatePlate() {
  const mutation = useMutation<void, Error, { id: number; data: UpdatePlate }>({
    mutationFn: ({ id, data }) => plate.update(id, data),
  })

  return mutation
}
