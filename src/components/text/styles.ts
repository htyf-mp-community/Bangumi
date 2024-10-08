/*
 * @Author: czy0729
 * @Date: 2022-05-01 11:46:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 05:06:22
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  /** base style */
  base: {
    includeFontPadding: false,
    // @ts-ignore
    textAlignVertical: STORYBOOK ? 'text-bottom' : 'center'
  },
  text: _.fontStyle,
  bold: _.fontBoldStyle,
  underline: {
    textDecorationLine: 'underline',
    textDecorationColor: STORYBOOK ? 'rgba(254, 138, 149, 0.88)' : _.select(_.colorMain, _.colorSub)
  },
  alignCenter: {
    textAlign: 'center'
  },
  alignRight: {
    textAlign: 'right'
  },
  shadow: {
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.32)'
  },
  noWrap: {
    // @ts-expect-error
    whiteSpace: 'nowrap'
  },

  /** theme color */
  plain: {
    color: _.colorPlain
  },
  __plain__: {
    color: _.__colorPlain__
  },
  main: {
    color: _.colorMain
  },
  primary: {
    color: _.colorPrimary
  },
  success: {
    color: _.colorSuccess
  },
  warning: {
    color: _.colorWarning
  },
  danger: {
    color: _.colorDanger
  },

  /** font color */
  title: {
    color: _.colorTitle
  },
  desc: {
    color: _.colorDesc
  },
  sub: {
    color: _.colorSub
  },
  icon: {
    color: _.colorIcon
  },
  border: {
    color: _.colorBorder
  },
  avatar: {
    color: _.colorAvatar
  },

  /** tinygrail theme color */
  bid: {
    color: _.colorBid
  },
  ask: {
    color: _.colorAsk
  },
  tinygrailPlain: {
    color: _.colorTinygrailPlain
  },
  tinygrailText: {
    color: _.colorTinygrailText
  },
  tinygrailIcon: {
    color: _.colorTinygrailIcon
  }
}))
