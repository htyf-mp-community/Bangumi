/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-09 10:47:25
 */
import React from 'react'
import { Page, StorybookPage, StorybookList, StorybookNavigation } from '@components'
import { ic } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Screen = ic(Store, (props, { $ }: Ctx) => {
  useMount(() => {
    $.init()
  })

  return (
    <Page>
      <List />
    </Page>
  )
})

export default {
  title: 'screens/Rank',
  component: Screen
}

export const Rank = () => (
  <StorybookPage>
    <StorybookList>
      <Screen
        navigation={StorybookNavigation}
        route={{
          params: {
            name: 'Rank'
          }
        }}
      />
    </StorybookList>
  </StorybookPage>
)
