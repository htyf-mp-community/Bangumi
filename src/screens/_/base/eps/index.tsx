/*
 * @Author: czy0729
 * @Date: 2021-08-10 00:34:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 23:01:42
 */
import React from 'react'
import { Component } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import EpsComp from './eps'
import { Props as EpsProps } from './types'

export { EpsProps }

/** 章节按钮组 */
export const Eps = ob((props: EpsProps) => (
  <Component id='base-eps'>
    <EpsComp {...props} orientation={_.orientation} />
  </Component>
))
