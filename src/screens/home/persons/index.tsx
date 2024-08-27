/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:36:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-26 10:03:07
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 制作人员 */
const Persons = (_props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-persons'>
      <Header />
      <Page loaded={$.persons._loaded}>
        <List />
      </Page>
      <Extra />
    </Component>
  ))
}

export default ic(Store, Persons)
