/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-05 05:32:44
 */
import React from 'react'
import { View } from 'react-native'
import { TabView } from '@components'
import { BlurView } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { Ctx } from '../types'
import TabBar from './tab-bar'
import { memoStyles } from './styles'

function Tab({ renderScene }, { $ }: Ctx) {
  // global.rerender('Home.Tab.Main')

  const styles = memoStyles()
  return (
    <TabView
      style={_.mt._sm}
      sceneContainerStyle={styles.sceneContainerStyle}
      lazy
      lazyPreloadDistance={0}
      // @ts-expect-error
      navigationState={$.navigationState}
      renderTabBar={renderTabBar}
      renderBackground={
        <View
          style={_.ios(
            $.tabs.length === 5 ? styles.blurViewIOS5 : styles.blurViewIOS4,
            styles.blurViewAndroid
          )}
        >
          {IOS && <BlurView style={_.absoluteFill} />}
        </View>
      }
      renderScene={renderScene}
      onIndexChange={$.onChange}
    />
  )
}

export default obc(Tab)

function renderTabBar(props) {
  return <TabBar {...props} />
}
