import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import ViewShot from 'react-native-view-shot'
import { IRNStarIO10Printer } from './models/RNStarIO10PrintModel'
import { preset } from './preset'
import { printImageFile } from './Print'
import { Receipt } from './Receipt'

interface PrintersProps {
  availablePrinters: IRNStarIO10Printer[]
}

interface ItemProps {
  printer: IRNStarIO10Printer
}

interface ReceiptModalProps extends Partial<ModalProps> {
  printer: IRNStarIO10Printer
  closeModal: () => void
}

const captureImage = async (
  printer: IRNStarIO10Printer,
  filePath: string,
  setIsPrinting: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    await printImageFile(printer, filePath, setIsPrinting)
  } catch (error) {
    console.log(error)
  }
}

const ReceiptModal = (props: ReceiptModalProps) => {
  const [isPrinting, setIsPrinting] = useState(false)

  return (
    <Modal isVisible={props.isVisible} hasBackdrop style={styles.modal}>
      <View style={styles.view_modal_container}>
        <View style={styles.view_modal_preview}>
          <ScrollView>
            <ViewShot
              captureMode={'mount'}
              onCapture={path => {
                const filePath = 'file://' + path

                captureImage(props.printer, filePath, setIsPrinting)
              }}>
              <Receipt />
            </ViewShot>
          </ScrollView>
        </View>

        <View style={styles.view_modal_close}>
          <TouchableOpacity
            style={styles.view_modal_close_button}
            disabled={isPrinting}
            onPress={() => {
              props.closeModal()
            }}>
            <Text style={[preset.fontsize_h1, styles.text_modal_close]}>
              {isPrinting ? 'Printing...' : 'Close'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const Item = (props: ItemProps) => {
  const [showModal, setShowModal] = useState(false)
  const { model, connectionSettings } = props.printer

  return (
    <View style={styles.view_item}>
      <View style={styles.view_item_info}>
        <Text
          style={[
            preset.fontsize_default,
            preset.fontweight_bold,
            styles.text_item_title,
          ]}>
          {`${model}: ${connectionSettings.interfaceType}`}
        </Text>

        <Text style={[preset.fontsize_small]}>
          {`identifier: ${connectionSettings.identifier}`}
        </Text>
      </View>

      <View style={styles.view_item_action}>
        <TouchableOpacity
          style={preset.view_button}
          onPress={() => {
            setShowModal(true)
          }}>
          <Text style={preset.text_button}>{'Print'}</Text>
        </TouchableOpacity>
      </View>

      <ReceiptModal
        isVisible={showModal}
        printer={props.printer}
        closeModal={() => {
          setShowModal(false)
        }}
      />
    </View>
  )
}

export const Printers = (props: PrintersProps) => {
  return (
    <ScrollView>
      {props.availablePrinters.map(printer => (
        <View
          key={printer.connectionSettings.identifier}
          style={styles.view_container}>
          <Item printer={printer} />
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view_container: {
    alignItems: 'center',
  },
  view_item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '44%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  view_item_info: {
    marginRight: 12,
  },
  text_item_title: {
    marginBottom: 4,
  },
  view_item_action: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_modal_container: {
    flex: 1,
    width: 500,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  view_modal_preview: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 24,
    alignItems: 'center',
  },
  view_modal_close: {
    width: '100%',
  },
  view_modal_close_button: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text_modal_close: {
    color: 'white',
  },
})
