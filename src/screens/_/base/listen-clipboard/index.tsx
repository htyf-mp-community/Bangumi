/*
 * @Author: czy0729
 * @Date: 2020-03-11 11:32:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 23:35:12
 */
import React from 'react'
import { AppState, Clipboard } from 'react-native'
import { Component } from '@components'
import { confirm, matchBgmUrl, navigationReference, appNavigate } from '@utils'
import { IOS, STORYBOOK } from '@constants'

let lastUrl = ''

/** 监听剪贴板疑似 bgm 链接 */
export const ListenClipboard = class ListenClipboardComponent extends React.Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    // 从 iOS 14 开始会有粘贴板读取提示, 很烦人暂时屏蔽
    if (IOS || STORYBOOK) return

    AppState.addEventListener('change', this.onAppStateChange)
    setTimeout(() => {
      this.checkContent()
    }, 1200)
  }

  componentWillUnmount() {
    if (IOS || STORYBOOK) return

    AppState.removeEventListener('change', this.onAppStateChange)
  }

  onAppStateChange = nextAppState => {
    const { appState } = this.state
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.checkContent()
    }

    this.setState({
      appState: nextAppState
    })
  }

  checkContent = async () => {
    const content = await Clipboard.getString()
    const urls = (matchBgmUrl(content, true) || []) as string[]
    const url = urls[0]
    if (url && url !== lastUrl) {
      lastUrl = url

      // 排除多个角色 小圣杯粘贴板逻辑
      const { length } = urls.filter(item => item.includes('/character/'))
      if (!(length > 1)) {
        confirm(`检测到链接${url}, 前往页面?`, () => {
          appNavigate(url, navigationReference())
        })
        Clipboard.setString('')
      }
    }
  }

  render() {
    return <Component id='base-listen-clipboard' />
  }
}
