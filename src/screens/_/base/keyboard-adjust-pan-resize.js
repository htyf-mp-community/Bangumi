/*
 * @Author: czy0729
 * @Date: 2021-11-28 14:27:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-29 04:49:39
 */
import React, { useCallback, useEffect } from 'react'
import { NavigationEvents } from 'react-navigation'
import { androidKeyboardAdjust } from '@utils/ui'

export const KeyboardAdjustPanResize = ({ onDidFocus, onDidBlur }) => {
  const _onDidFocus = useCallback(() => {
    androidKeyboardAdjust('setAdjustPan')
    if (typeof onDidFocus === 'function') onDidFocus()
  }, [onDidFocus])
  const _onDidBlur = useCallback(() => {
    androidKeyboardAdjust('setAdjustResize')
    if (typeof onDidBlur === 'function') onDidBlur()
  }, [onDidBlur])
  useEffect(() => {
    androidKeyboardAdjust('setAdjustPan')
  }, [])
  return <NavigationEvents onDidFocus={_onDidFocus} onDidBlur={_onDidBlur} />
}
