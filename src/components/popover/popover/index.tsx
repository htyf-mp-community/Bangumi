/*
 * @Author: czy0729
 * @Date: 2019-03-16 10:54:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 05:04:27
 */
import React, { useEffect, useMemo, useRef } from 'react'
import { DeviceEventEmitter, View } from 'react-native'
import { HoldItem } from 'react-native-hold-menu'
import { _ } from '@stores'
import { IOS } from '@constants'

const EVENT_TYPE = 'POPOVER_ONSELECT'
let id = 0

function Popover({ children, ...other }) {
  const { style, overlay } = other
  const data = other?.data || overlay?.props?.data
  const title = other?.title || overlay?.props?.title || ''
  const onSelect = other?.onSelect || overlay?.props?.onSelect || Function.prototype
  const eventId = useRef((id += 1))
  const eventType = `${EVENT_TYPE}|${eventId.current}`
  const items = useMemo(() => {
    const _items = (data || []).map((item: any) => ({
      text: item,
      eventType
    }))
    if (title) {
      _items.unshift({
        text: title,
        isTitle: true
      })
    }
    return _items
  }, [title, data, eventType])

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      eventType,
      value => {
        let index = -1
        try {
          index = data.findIndex((item: any) => item === value)
        } catch (error) {}

        setTimeout(() => {
          onSelect(value, index)
        }, 0)
      },
      [onSelect]
    )

    return () => subscription.remove()
  })

  return (
    <View style={style}>
      <HoldItem
        // @ts-expect-error
        styles={styles.holdItem}
        items={items}
        activateOn='tap'
        disableMove={items.length >= 10}
        closeOnTap
        hapticFeedback={IOS ? 'Light' : 'None'}
      >
        {children}
      </HoldItem>
    </View>
  )
}

export default Popover

const styles = _.create({
  holdItem: {
    position: 'relative',
    maxWidth: '50%'
  }
})
