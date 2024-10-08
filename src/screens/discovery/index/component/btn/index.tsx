/*
 * @Author: czy0729
 * @Date: 2021-06-11 15:08:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 15:59:20
 */
import React from 'react'
import { Clipboard } from 'react-native'
import { userStore } from '@stores'
import { appNavigate, info, matchBgmUrl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import { getLastPath } from '@screens/_/base/filter-switch'
import { Ctx } from '../../types'
import Btn from './btn'
import { COMPONENT } from './ds'

export default obc(({ item }, { $, navigation }: Ctx) => {
  const { username, id } = userStore.userInfo
  const { dragging } = $.state
  const { key, login } = item
  return (
    <Btn
      item={item}
      userId={username || id}
      onPress={
        dragging
          ? undefined
          : async () => {
              if (login && !username && !id) {
                info(`请先${i18n.login()}`)
                return
              }

              if (key === 'Open') {
                $.toggleDragging()
                return
              }

              t('发现.跳转', {
                to: key,
                from: 'Btn'
              })

              if (key === 'Anime') {
                const key = await getLastPath()
                return navigation.push(key)
              }

              if (key === 'Netabare') {
                return navigation.push('WebBrowser', {
                  url: 'https://netaba.re/trending',
                  title: '评分趋势'
                })
              }

              if (key === 'UserTimeline') {
                return navigation.push(key, {
                  userId: username || id
                })
              }

              if (key === 'Link') {
                const content = await Clipboard.getString()
                const urls = matchBgmUrl(content, true) || []
                const url = urls[0]
                if (!url) {
                  $.toggleLinkModal()
                  return true
                }

                return appNavigate(url, navigation)
              }

              return navigation.push(
                key,
                login
                  ? {
                      userName: username || id
                    }
                  : {}
              )
            }
      }
    />
  )
}, COMPONENT)
