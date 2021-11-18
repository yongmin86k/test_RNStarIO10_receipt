import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Discover } from './Discover'
import { IRNStarIO10Printer } from './models/RNStarIO10PrintModel'
import { getAvailablePrinters } from './Print'
import { Printers } from './Printers'

const App = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [availablePrinters, setAvailablePrinters] = useState<
    IRNStarIO10Printer[]
  >([])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view_discover}>
        <Discover
          isSearching={isSearching}
          searchPrinters={() =>
            getAvailablePrinters(setIsSearching, setAvailablePrinters)
          }
        />
      </View>

      <View style={styles.view_printers}>
        <Printers availablePrinters={availablePrinters} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view_discover: {
    height: 100,
    padding: 16,
  },
  view_printers: {
    flex: 1,
    padding: 16,
  },
})

export default App
