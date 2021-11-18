import {
  InterfaceType,
  StarPrinterModel,
  StarPrinterEmulation,
  StarConnectionSettings
} from 'react-native-star-io10'

export interface IRNStarIO10Printer {
  model: StarPrinterModel
  emulation: StarPrinterEmulation
  connectionSettings: StarConnectionSettings
}

const RECEIPT_WIDTH_58_MODELS = [
  StarPrinterModel.mPOP,
  StarPrinterModel.mC_Print2,
  StarPrinterModel.SM_S210i,
  StarPrinterModel.SM_S230i,
  StarPrinterModel.SM_L200,
  StarPrinterModel.BSC10,
  StarPrinterModel.SK1_2xx
]

const RECEIPT_WIDTH_80_MODELS = [
  StarPrinterModel.SM_T300,
  StarPrinterModel.SM_T300i,
  StarPrinterModel.SM_L300,
  StarPrinterModel.TSP650II,
  StarPrinterModel.TSP700II,
  StarPrinterModel.TSP100IIIBI,
  StarPrinterModel.TSP100IIILAN,
  StarPrinterModel.TSP100IIIU,
  StarPrinterModel.TSP100IIIW,
  StarPrinterModel.TSP043,
  StarPrinterModel.SP700,
  StarPrinterModel.TUP500,
  StarPrinterModel.TUP500,
  StarPrinterModel.SK1_3xx
]

const RECEIPT_WIDTH_112_MODELS = [StarPrinterModel.TSP800II, StarPrinterModel.SM_T400i]

const INTERFACE_TYPE = [
  InterfaceType.Bluetooth,
  InterfaceType.BluetoothLE,
  InterfaceType.Lan,
  InterfaceType.Usb,
  InterfaceType.Unknown
]

export const RNStarIO10PrintModel = {
  RECEIPT_WIDTH_58_MODELS,
  RECEIPT_WIDTH_80_MODELS,
  RECEIPT_WIDTH_112_MODELS,
  INTERFACE_TYPE
}
