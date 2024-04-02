import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, View } from 'react-native'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import { useCreatePlateManually } from '~/services/api/plate/hooks'

type Form = {
  food: string
  calories: string
  proteins: string
  fats: string
  carbs: string
  eaten: string
}

function fillNumber(str: string) {
  const n = Number(str)

  return Number.isNaN(n) ? 0 : n
}

export default function Modal() {
  const { control, handleSubmit } = useForm<Form>({
    defaultValues: {
      food: '',
      calories: '',
      proteins: '',
      fats: '',
      carbs: '',
      eaten: '',
    },
  })

  const create = useCreatePlateManually()

  const client = useQueryClient()

  async function onSubmit(data: Form) {
    try {
      await create.mutateAsync(
        {
          food: data.food || 'Food',
          calories: fillNumber(data.calories),
          proteins: fillNumber(data.proteins),
          fats: fillNumber(data.fats),
          carbs: fillNumber(data.carbs),
          eaten: fillNumber(data.eaten),
          date: new Date().toISOString(),
        },
        {
          onSuccess() {
            client.invalidateQueries()
            router.push('../')
          },
        },
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View className="flex flex-1 flex-col justify-end">
      <KeyboardAvoidingView
        enabled
        className="flex-1justify-end gap-4"
        behavior="position"
        keyboardVerticalOffset={100}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text className="mb-1">Food</Text>
              <Input
                placeholder="Food"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="food"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mt-4">
              <Text className="mb-1">Calories</Text>
              <Input
                placeholder="Calories"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
              />
            </View>
          )}
          name="calories"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mt-4">
              <Text className="mb-1">Proteins</Text>
              <Input
                placeholder="Proteins"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
              />
            </View>
          )}
          name="proteins"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mt-4">
              <Text className="mb-1">Fats</Text>
              <Input
                placeholder="Fats"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
              />
            </View>
          )}
          name="fats"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mt-4">
              <Text className="mb-1">Carbs</Text>
              <Input
                placeholder="Carbs"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
              />
            </View>
          )}
          name="carbs"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mt-4">
              <Text className="mb-1">Eaten (g)</Text>
              <Input
                placeholder="Eaten"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
              />
            </View>
          )}
          name="eaten"
        />
        <Button onPress={handleSubmit(onSubmit)} className="mt-4">
          <Text>Add</Text>
        </Button>
      </KeyboardAvoidingView>
    </View>
  )
}