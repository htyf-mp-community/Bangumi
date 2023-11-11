/*
 * @Author: czy0729
 * @Date: 2019-12-10 22:47:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 23:43:57
 */
import React from 'react'
import { Component, NavigationEvents } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { Props as NavigationBarEventsProps } from './types'

export { NavigationBarEventsProps }

/** @deprecated */
export const NavigationBarEvents = ob(({ tinygrail }: NavigationBarEventsProps) => {
  if (IOS) return null

  return (
    <Component id='base-navigation-bar-events'>
      <NavigationEvents
        onWillFocus={() => {
          try {
            if (tinygrail) {
              _.changeNavigationBarColorTinygrail()
            } else {
              _.changeNavigationBarColor()
            }
          } catch (error) {
            console.warn('[NavigationBarEvents] onWillFocus', error)
          }
        }}
      />
    </Component>
  )
})
