import { Feather } from '@expo/vector-icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  View,
} from 'react-native'

import { Input } from '../src/components/Input'
import { Typography } from '../src/components/Typography'
import { Plate, api } from '../src/core/api'
import { cx } from '../src/utils/cx'

const today = new Date().toISOString()

function formatNumber(num: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  })
  return Number(formatter.format(num))
}

export default function Page() {
  const [input, setInput] = useState('')

  const params = useLocalSearchParams()

  const date = useMemo(() => {
    if (typeof params.date === 'string') {
      return new Date(params.date).toISOString()
    }

    return today
  }, [params])

  const { data = [], refetch } = useQuery({
    queryKey: ['plate', date],
    queryFn: () => api.plate.getByDate(date),
  })
  const { mutate: create, isPending } = useMutation({
    mutationFn: api.plate.create,
    onSuccess: () => {
      setInput('')
      refetch()
    },
  })
  const { mutate: remove } = useMutation({
    mutationFn: api.plate.remove,
    onSuccess: () => {
      refetch()
    },
  })

  const total = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        return {
          calories: formatNumber(acc.calories + item.calories),
          proteins: formatNumber(acc.proteins + item.proteins),
          fats: formatNumber(acc.fats + item.fats),
          carbs: formatNumber(acc.carbs + item.carbs),
        }
      },
      { calories: 0, proteins: 0, fats: 0, carbs: 0 },
    )
  }, [data])

  const title = useMemo(() => {
    if (dayjs(date).isSame(today, 'day')) {
      return 'Today'
    }

    return dayjs(date).format('MMMM D, YYYY')
  }, [date])

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerRight: () => {
            return (
              <Link href={`/modal?date=${date}`} asChild>
                <Pressable>
                  <Feather name="calendar" size={24} />
                </Pressable>
              </Link>
            )
          },
        }}
      />
      <View className="mb-4 flex flex-row justify-between px-4">
        <Typography className="flex-1 text-sm">Calories</Typography>
        <Typography className="flex-1 text-sm">Proteins</Typography>
        <Typography className="flex-1 text-sm">Fats</Typography>
        <Typography className="flex-1 text-sm">Carbs</Typography>
      </View>
      <FlatList<Plate>
        ItemSeparatorComponent={() => <View className="my-2 h-0.5 w-full" />}
        renderItem={({ item }) => {
          return (
            <View className="rounded-lg border border-zinc-300 p-4">
              <Typography className="max-w-[70%] font-main600 text-sm">
                {item.food} ({item.eaten}g)
              </Typography>
              <View className="mt-2 flex flex-row">
                <Typography className="flex-1 text-sm">
                  {item.calories}
                </Typography>
                <Typography className="flex-1 text-sm">
                  {item.proteins}
                </Typography>
                <Typography className="flex-1 text-sm">{item.fats}</Typography>
                <Typography className="flex-1 text-sm">{item.carbs}</Typography>
              </View>
              <Pressable
                className="absolute right-4 top-4 rounded-md"
                onPress={() => {
                  remove(item.id)
                }}
              >
                <Feather name="trash-2" size={18} />
              </Pressable>
            </View>
          )
        }}
        data={data}
      />
      <KeyboardAvoidingView
        behavior="position"
        className="flex-1 justify-end bg-white"
        keyboardVerticalOffset={100}
      >
        <View className="mb-4 rounded-lg px-4">
          <Typography className="font-main800 text-sm capitalize">
            Total
          </Typography>
          <View className="mt-2 flex flex-row">
            <Typography className="flex-1 text-sm">{total.calories}</Typography>
            <Typography className="flex-1 text-sm">{total.proteins}</Typography>
            <Typography className="flex-1 text-sm">{total.fats}</Typography>
            <Typography className="flex-1 text-sm">{total.carbs}</Typography>
          </View>
        </View>
        <View>
          <Input
            readOnly={isPending}
            multiline
            placeholder="Text what you have eaten..."
            onChangeText={setInput}
            className={cx('mb-4', {
              'text-zinc-400': isPending,
            })}
            returnKeyType="send"
            blurOnSubmit
            enablesReturnKeyAutomatically
            value={input}
            onKeyPress={({ nativeEvent }) => {
              console.log(nativeEvent.key)
            }}
            onSubmitEditing={({ nativeEvent }) => {
              create(nativeEvent.text)
            }}
          />
          {isPending && (
            <ActivityIndicator className="absolute right-4 top-4" />
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
