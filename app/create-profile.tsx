import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Text } from '~/components/ui/text'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="flex-1 justify-center"
    >
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1 justify-center"
      >
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Calculate your daily calorie needs and metabolic rate with this
              quick form. Enter your data to receive calorie target and
              metabolism estimate, along with nutrition tips.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View className="mb-4">
              <Text className="mb-2">Age</Text>
              <Input
                placeholder="Age"
                keyboardType="decimal-pad"
                returnKeyType="done"
              />
            </View>
            <View className="mb-4">
              <Text className="mb-2">Gender</Text>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select gender"
                    className="font-main text-foreground"
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets}>
                  <SelectItem label="Male" value="male">
                    Male
                  </SelectItem>
                  <SelectItem label="Female" value="female">
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
            </View>
            <View className="mb-4">
              <Text className="mb-2">Weight (kg)</Text>
              <Input
                placeholder="Weight"
                keyboardType="decimal-pad"
                returnKeyType="done"
              />
            </View>
            <View className="mb-4">
              <Text className="mb-2">Height (cm)</Text>
              <Input
                placeholder="Height"
                keyboardType="decimal-pad"
                returnKeyType="done"
              />
            </View>
            <View className="mb-4">
              <Text className="mb-2">Activity Level</Text>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    className="font-main text-foreground"
                    placeholder="Select activity level"
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets}>
                  <SelectItem
                    label="None"
                    value="none"
                    description="Mostly sedentary lifestyle"
                  >
                    None
                  </SelectItem>
                  <SelectItem
                    label="Low"
                    value="low"
                    description="Mostly sedentary with occasional activity"
                  >
                    Low
                  </SelectItem>
                  <SelectItem
                    label="Moderate"
                    value="moderate"
                    description="Active lifestyle with regular movement"
                  >
                    Moderate
                  </SelectItem>
                  <SelectItem
                    label="High"
                    value="high"
                    description="Very active lifestyle or physically demanding job"
                  >
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
            </View>
            <View className="mb-4">
              <Text className="mb-2">Your Goal</Text>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    className="font-main text-foreground"
                    placeholder="Select goal"
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets}>
                  <SelectItem
                    label="Weight Loss"
                    value="weight_loss"
                    description="Creating a calorie deficit to reduce body weight"
                  >
                    Weight Loss
                  </SelectItem>
                  <SelectItem
                    label="Muscle Gain"
                    value="muscle_gain"
                    description="Ensuring a calorie surplus for muscle growth"
                  >
                    Muscle Gain
                  </SelectItem>
                  <SelectItem
                    label="Weight Maintenance"
                    value="weight_maintenance"
                    description="Maintaining a calorie balance to keep current weight"
                  >
                    Weight Maintenance
                  </SelectItem>
                  <SelectItem
                    label="Health Improvement"
                    value="health_improvement"
                    description="Optimizing nutrient intake and managing medical conditions"
                  >
                    Health Improvement
                  </SelectItem>
                </SelectContent>
              </Select>
            </View>
            <Button>
              <Text>Generate Data</Text>
            </Button>
          </CardContent>
        </Card>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
