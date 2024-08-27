/*
 * @Author: czy0729
 * @Date: 2024-04-18 14:38:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-27 10:24:45
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const DATA = [TEXT_MENU_BROWSER] as const
