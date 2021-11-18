import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

enum PRESET_KEY {
  view_button = 'view_button',
  view_disabled_button = 'view_disabled_button',
  text_button = 'text_button',
  fontsize_h1 = 'fontsize_h1',
  fontsize_default = 'fontsize_default',
  fontsize_small = 'fontsize_small',
  fontweight_bold = 'fontweight_bold',
  textalign_center = 'textalign_center',
}

const fontsize = {
  h1: 24,
  default: 16,
  small: 12,
}

export const preset: { [P in PRESET_KEY]: ViewStyle | TextStyle | ImageStyle } =
  {
    view_button: {
      backgroundColor: 'black',
      borderRadius: 4,
    },
    view_disabled_button: {
      backgroundColor: 'grey',
      borderRadius: 4,
    },
    text_button: {
      fontSize: fontsize.h1,
      paddingHorizontal: 16,
      paddingVertical: 12,
      color: 'white',
      minWidth: 120,
      textAlign: 'center',
    },
    fontsize_h1: {
      fontSize: fontsize.h1,
    },
    fontsize_default: {
      fontSize: fontsize.default,
    },
    fontsize_small: {
      fontSize: fontsize.small,
    },
    fontweight_bold: {
      fontWeight: 'bold',
    },
    textalign_center: {
      textAlign: 'center',
    },
  }
