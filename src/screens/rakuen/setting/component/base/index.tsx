/*
 * @Author: czy0729
 * @Date: 2024-01-31 18:05:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 18:09:39
 */
import React from 'react'
import { SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { rakuenStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { styles } from '../styles'
import { COMPONENT } from './ds'

/** 基本设置 */
function Base() {
  const { filterDelete, isBlockDefaultUser, isMarkOldTopic } = rakuenStore.setting
  return (
    <Block>
      <Tip>列表</Tip>
      <ItemSetting
        hd='过滤用户删除的楼层'
        ft={
          <SwitchPro
            style={styles.switch}
            value={filterDelete}
            onSyncPress={() => {
              t('超展开设置.切换', {
                title: '过滤删除',
                checked: !filterDelete
              })
              rakuenStore.switchSetting('filterDelete')
            }}
          />
        }
        withoutFeedback
      />
      <ItemSetting
        hd='屏蔽疑似广告姬'
        information='屏蔽默认头像发布且回复数小于 4 的帖子'
        ft={
          <SwitchPro
            style={styles.switch}
            value={isBlockDefaultUser}
            onSyncPress={() => {
              t('超展开设置.切换', {
                title: '屏蔽广告',
                checked: !isBlockDefaultUser
              })
              rakuenStore.switchSetting('isBlockDefaultUser')
            }}
          />
        }
        withoutFeedback
      />
      <ItemSetting
        information='标记发布时间大于 1 年的帖子'
        hd='标记坟贴'
        ft={
          <SwitchPro
            style={styles.switch}
            value={isMarkOldTopic}
            onSyncPress={() => {
              t('超展开设置.切换', {
                title: '坟贴',
                checked: !isMarkOldTopic
              })
              rakuenStore.switchSetting('isMarkOldTopic')
            }}
          />
        }
        withoutFeedback
      />
    </Block>
  )
}

export default ob(Base, COMPONENT)
