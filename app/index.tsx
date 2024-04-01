import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { FlatList, KeyboardAvoidingView, View } from 'react-native'

import { DatePicker } from '~/components/DatePicker'
import { Edit2, Trash2 } from '~/components/Icons'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import { buildDateTitle, formatNumber, toDate } from '~/lib/utils'
import type { Plate } from '~/services/api/plate/entities'
import { useCreatePlate, usePlatesByDate } from '~/services/api/plate/hooks'

export default function Screen() {
  const params = useLocalSearchParams<{ date?: string }>()
  const date = toDate(params.date)
  const title = buildDateTitle(date)

  const { data = [], refetch } = usePlatesByDate()

  const create = useCreatePlate()

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

  return (
    <>
      <Stack.Screen
        options={{
          title,
        }}
      />
      <View className="flex-1">
        <View className="flex-1">
          <FlatList<Plate>
            data={data}
            renderItem={({ item }) => {
              return (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {item.food} ({item.eaten}g)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <View className="mt-2 flex flex-row">
                      <View className="flex-1">
                        <Text className="mb-2 text-xs text-muted-foreground">
                          Calories
                        </Text>
                        <Text className="text-sm">{item.calories}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="mb-2 text-xs text-muted-foreground">
                          Prot
                        </Text>
                        <Text className="text-sm">{item.proteins}g</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="mb-2 text-xs text-muted-foreground">
                          Fats
                        </Text>
                        <Text className="text-sm">{item.fats}g</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="mb-2 text-xs text-muted-foreground">
                          Carbs
                        </Text>
                        <Text className="text-sm">{item.carbs}g</Text>
                      </View>
                    </View>
                  </CardContent>
                  <CardFooter>
                    <View className="ml-auto flex flex-row gap-4">
                      <Button
                        variant="outline"
                        className="flex flex-row gap-2"
                        size="sm"
                      >
                        <Edit2 size={14} className="text-foreground" />
                        <Text>Edit</Text>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-row gap-2"
                        size="sm"
                      >
                        <Trash2 size={14} className="text-foreground" />
                        <Text>Remove</Text>
                      </Button>
                    </View>
                  </CardFooter>
                </Card>
              )
            }}
          />
        </View>
        <View className="mb-4 rounded-lg px-4">
          <Text className="font-main800 text-sm capitalize">Total</Text>
          <View className="mt-2 flex flex-row">
            <View className="flex-1">
              <Text className="mb-2 text-xs text-muted-foreground">
                Calories
              </Text>
              <Text className="text-sm">{total.calories}</Text>
            </View>
            <View className="flex-1">
              <Text className="mb-2 text-xs text-muted-foreground">Prot</Text>
              <Text className="text-sm">{total.proteins}g</Text>
            </View>
            <View className="flex-1">
              <Text className="mb-2 text-xs text-muted-foreground">Fats</Text>
              <Text className="text-sm">{total.fats}g</Text>
            </View>
            <View className="flex-1">
              <Text className="mb-2 text-xs text-muted-foreground">Carbs</Text>
              <Text className="text-sm">{total.carbs}g</Text>
            </View>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="position"
          className="flex-2 justify-end"
          keyboardVerticalOffset={140}
        >
          <Input
            placeholder="Text what you have eaten..."
            returnKeyType="send"
            blurOnSubmit
            multiline
            onSubmitEditing={({ nativeEvent }) => {
              create.mutate(nativeEvent.text, {
                onSuccess() {
                  refetch()
                  nativeEvent.text = ''
                },
              })
            }}
          />
        </KeyboardAvoidingView>
        <DatePicker
          value={date}
          onChange={(_, d) => {
            if (d) router.setParams({ date: d.toISOString() })
          }}
        >
          <Button className="mt-4">
            <Text>Select Date</Text>
          </Button>
        </DatePicker>
      </View>
    </>
  )
}
