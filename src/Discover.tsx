import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { IRNStarIO10Printer } from './models/RNStarIO10PrintModel'
import { preset } from './preset'

interface DiscoverProps {
  isSearching: boolean
  searchPrinters: () => Promise<IRNStarIO10Printer[]>
}

interface ButtonProps {
  onPress: () => void
  label: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={() => {
        props.onPress()
      }}
      style={props.style}>
      <Text style={preset.text_button}>{props.label}</Text>
    </TouchableOpacity>
  )
}

export const Discover = (props: DiscoverProps) => {
  return (
    <View>
      <View style={styles.view_container}>
        <Button
          onPress={() => {
            props.searchPrinters()
          }}
          label={props.isSearching ? 'Searching...' : 'Search Printers'}
          disabled={props.isSearching}
          style={
            props.isSearching ? preset.view_disabled_button : preset.view_button
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
