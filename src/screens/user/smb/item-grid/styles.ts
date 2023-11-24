/*
 * @Author: czy0729
 * @Date: 2023-11-24 08:05:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 17:48:35
 */
import { _ } from '@stores'

const num = 3

export const memoStyles = _.memoStyles(() => {
  const width = (_.window.contentWidth - _.md * (num - 1)) / num
  return {
    container: {
      width,
      marginBottom: _.md,
      backgroundColor: _.colorPlain
    },
    content: {
      position: 'absolute',
      zIndex: 1,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.88
    },
    folderContent: {
      bottom: 32
    },
    title: {
      minHeight: 48,
      paddingHorizontal: 10,
      paddingBottom: 10,
      opacity: 0.88
    },
    folderTitle: {
      marginBottom: -24
    }
  }
})
