import dayjs from 'dayjs'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import DateTimePicker from 'react-native-ui-datepicker'

const font = {
  fontFamily: 'MartianMono_500Medium',
} as const

export default function Modal() {
  const params = useLocalSearchParams()

  return (
    <View>
      <DateTimePicker
        mode="single"
        date={dayjs(params.date as string)}
        timePicker={false}
        todayContainerStyle={{
          backgroundColor: '#fff',
          borderColor: '#000',
        }}
        todayTextStyle={{
          ...font,
          color: '#000',
        }}
        selectedTextStyle={{
          ...font,
          color: '#fff',
        }}
        selectedItemColor="#000"
        calendarTextStyle={font}
        headerTextStyle={font}
        weekDaysTextStyle={font}
        onChange={({ date }) => {
          router.back()
          router.replace(`/${date}`)
        }}
      />
      <StatusBar style="light" />
    </View>
  )
}
