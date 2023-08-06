/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:19:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 19:22:33
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1001,
    right: 0,
    bottom: 0,
    left: 0,
    paddingTop: 2,
    paddingBottom: _.ios(20, 0),
    marginBottom: -1,
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 0
  },
  plain: {
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderTopWidth: _.select(_.hairlineWidth, 0),
    borderTopColor: _.colorBorder
  }
}))
