import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, TextInputProps, View } from 'react-native'
import { preset } from './preset'

const TextSMB = (props: PropsWithChildren<TextInputProps>) => {
  return (
    <>
      <Text style={[styles.smb, props.style]}>{props.children}</Text>
    </>
  )
}

const TextLMB = (props: PropsWithChildren<TextInputProps>) => {
  return (
    <>
      <Text style={[styles.lmb, props.style]}>{props.children}</Text>
    </>
  )
}

export const Receipt = () => {
  const number = 200
  const arr = Array.from(new Array(number))

  return (
    <View style={styles.view_content}>
      <TextLMB style={[preset.fontsize_default, , preset.textalign_center]}>
        {` `}
      </TextLMB>

      <TextSMB
        style={[
          preset.fontsize_h1,
          preset.fontweight_bold,
          preset.textalign_center,
        ]}>
        YK store
      </TextSMB>
      <TextSMB style={[preset.fontsize_default, preset.textalign_center]}>
        1234 Greenline Street
      </TextSMB>
      <TextLMB style={[preset.fontsize_default, , preset.textalign_center]}>
        Vancouver, Canada C0N 1A2
      </TextLMB>

      <TextSMB style={[preset.fontsize_default, preset.fontweight_bold]}>
        Products
      </TextSMB>

      {arr.map((_, index) => (
        <View key={`product_${index}`} style={styles.twoColumns}>
          <TextSMB style={[preset.fontsize_default]}>
            {`product_${index}`}
          </TextSMB>

          <TextSMB style={[preset.fontsize_default]}>$10.00</TextSMB>
        </View>
      ))}
      <TextLMB style={[preset.fontsize_default, , preset.textalign_center]}>
        {` `}
      </TextLMB>

      <TextSMB style={[preset.fontsize_default, preset.fontweight_bold]}>
        Total
      </TextSMB>
      <TextLMB style={[preset.fontsize_h1]}>{`$ ${number * 10.0}`}</TextLMB>

      <TextSMB style={[preset.fontsize_default]}>Refunds and Exchanges</TextSMB>
      <TextSMB style={[preset.fontsize_default]}>
        Within 30 days with receipt
      </TextSMB>
      <TextSMB style={[preset.fontsize_default]}>And tags attached</TextSMB>

      <TextLMB style={[preset.fontsize_default, , preset.textalign_center]}>
        {` `}
      </TextLMB>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    alignItems: 'center',
  },
  view_content: {
    width: 452,
  },
  smb: {
    marginBottom: 4,
  },
  lmb: {
    marginBottom: 16,
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
