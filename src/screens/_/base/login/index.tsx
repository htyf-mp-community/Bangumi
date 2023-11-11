/*
 * @Author: czy0729
 * @Date: 2019-05-20 22:29:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 23:37:05
 */
import React from 'react'
import { Text, Button, Component } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import i18n from '@constants/i18n'
import { styles } from './styles'
import { Props as LoginProps } from './types'

export { LoginProps }

/** 提示登录块 */
export const Login = obc(
  (
    { style, text = '', btnText = `重新${i18n.login()}` }: LoginProps,
    { navigation }
  ) => (
    <Component
      id='base-login'
      style={stl(_.container.column, _.container._plain, style)}
    >
      {!!text && (
        <Text style={_.mb.md} type='sub' size={16}>
          {text}
        </Text>
      )}
      <Button style={styles.btn} shadow onPress={() => navigation.push('LoginV2')}>
        {btnText}
      </Button>
    </Component>
  )
)
