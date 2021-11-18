import { uniqBy } from 'lodash'
import { Dispatch, SetStateAction } from 'react'
import { Platform } from 'react-native'
import {
  InterfaceType,
  StarConnectionSettings,
  StarDeviceDiscoveryManager,
  StarDeviceDiscoveryManagerFactory,
  StarPrinter,
  StarPrinterEmulation,
  StarPrinterModel,
  StarXpandCommand,
} from 'react-native-star-io10'
import { IRNStarIO10Printer } from './models/RNStarIO10PrintModel'

const isIOS = Platform.OS === 'ios'

const closePrinter = async (printer: StarPrinter) => {
  await printer.close()
  await printer.dispose()
}

export const getRNStarIO10Printers = (
  discoveredPrinters: StarPrinter[],
): Promise<IRNStarIO10Printer[]> =>
  new Promise<IRNStarIO10Printer[]>(async (resolve, reject) => {
    if (isIOS) {
      const starIO10Printers = discoveredPrinters.map(printer => {
        const printerInformation = printer.information

        const starIO10Printer: IRNStarIO10Printer = {
          model: printerInformation
            ? printerInformation.model
            : StarPrinterModel.Unknown,
          emulation: printerInformation
            ? printerInformation.emulation
            : StarPrinterEmulation.Unknown,
          connectionSettings: printer.connectionSettings,
        }

        return starIO10Printer
      })

      return resolve(starIO10Printers)
    } else {
      const RNStarIO10Printers: IRNStarIO10Printer[] = []

      let index = 0
      for (const printer of discoveredPrinters) {
        let starIO10Printer: IRNStarIO10Printer = {
          model: StarPrinterModel.Unknown,
          emulation: StarPrinterEmulation.Unknown,
          connectionSettings: printer.connectionSettings,
        }

        printer.printerDelegate.onReady = () => {
          if (printer.information) {
            starIO10Printer = {
              model: printer.information.model,
              emulation: printer.information.emulation,
              connectionSettings: printer.connectionSettings,
            }
          }

          RNStarIO10Printers.push(starIO10Printer)
          index++

          if (index === discoveredPrinters.length) {
            resolve(RNStarIO10Printers)
          }
        }

        try {
          await printer.open()
        } catch (error) {
          // Printer can error out when the power is not on
          index++
          if (index === discoveredPrinters.length) {
            resolve(RNStarIO10Printers)
          }
        } finally {
          closePrinter(printer)
        }
      }
    }
  })

export const getAvailablePrinters = (
  setIsSearching: Dispatch<SetStateAction<boolean>>,
  setAvailablePrinters: Dispatch<SetStateAction<IRNStarIO10Printer[]>>,
) => {
  return new Promise<IRNStarIO10Printer[]>(async (resolve, reject) => {
    const timeout = 10 * 1000

    let manager: StarDeviceDiscoveryManager | undefined

    setIsSearching(true)

    await manager?.stopDiscovery()

    manager = await StarDeviceDiscoveryManagerFactory.create([
      InterfaceType.Bluetooth,
      InterfaceType.Lan,
    ])

    manager.discoveryTime = timeout

    const discoveredPrinters: StarPrinter[] = []
    let availablePrinters: IRNStarIO10Printer[] = []

    manager.onPrinterFound = (printer: StarPrinter) => {
      discoveredPrinters.push(printer)
    }

    manager.onDiscoveryFinished = async () => {
      const uniquePrinters = uniqBy(
        discoveredPrinters,
        'connectionSettings.identifier',
      )

      const RNStarIO10Printers = await getRNStarIO10Printers(uniquePrinters)

      availablePrinters = RNStarIO10Printers
      setIsSearching(false)

      setAvailablePrinters(availablePrinters)
      resolve(availablePrinters)
    }

    await manager.startDiscovery()
  })
}

export const printImageFile = async (
  printer: IRNStarIO10Printer,
  filePath: string,
  setIsPrinting: Dispatch<SetStateAction<boolean>>,
) => {
  setIsPrinting(true)

  const printWidth = 576
  const builder = new StarXpandCommand.StarXpandCommandBuilder()
  const document = new StarXpandCommand.DocumentBuilder()
  const printerBuilder = new StarXpandCommand.PrinterBuilder()
  const imageParameter = new StarXpandCommand.Printer.ImageParameter(
    filePath,
    printWidth,
  )

  printerBuilder
    .actionPrintImage(imageParameter)
    .actionFeedLine(1)
    .actionCut(StarXpandCommand.Printer.CutType.Partial)

  document.addPrinter(printerBuilder)

  builder.addDocument(document)

  const commands = await builder.getCommands()

  const settings = new StarConnectionSettings()
  settings.interfaceType = printer.connectionSettings.interfaceType
  settings.identifier = printer.connectionSettings.identifier

  const selectedPrinter = new StarPrinter(settings)

  try {
    await selectedPrinter.open()
    await selectedPrinter.print(commands)
  } catch (error) {
    throw error
  } finally {
    closePrinter(selectedPrinter)
    setIsPrinting(false)
  }
}
