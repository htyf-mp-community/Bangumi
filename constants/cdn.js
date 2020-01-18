/* eslint-disable no-cond-assign */
/* eslint-disable no-bitwise */
/*
 * @Author: czy0729
 * @Date: 2020-01-17 11:59:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-18 14:46:49
 */
import { HASH_AVATAR } from './hash'

export const HOST_CDN = 'https://cdn.jsdelivr.net'

const I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split(
  ''
)
function hash(input) {
  let hash = 5381
  let i = input.length - 1

  if (typeof input == 'string') {
    for (; i > -1; i -= 1) hash += (hash << 5) + input.charCodeAt(i)
  } else {
    for (; i > -1; i -= 1) hash += (hash << 5) + input[i]
  }
  let value = hash & 0x7fffffff

  let retValue = ''
  do {
    retValue += I64BIT_TABLE[value & 0x3f]
  } while ((value >>= 6))

  return retValue
}

/**
 * 每日放送
 */
export const CDN_ONAIR = `${HOST_CDN}/gh/ekibun/bangumi_onair@master/calendar.json`

/**
 * 单集数据源
 * @param {*} subjectId
 */
export const CDN_EPS = subjectId =>
  `${HOST_CDN}/gh/ekibun/bangumi_onair@master/onair/${parseInt(
    parseInt(subjectId) / 1000
  )}/${subjectId}.json`

/**
 * 条目CDN自维护数据
 * @param {*} subjectId
 */
export const CDN_SUBJECT = subjectId =>
  `${HOST_CDN}/gh/czy0729/Bangumi-Subject@master/data/${parseInt(
    parseInt(subjectId) / 100
  )}/${subjectId}.json`

/**
 * 超展开小组CDN自维护数据
 * @param {*} topicId
 * @param {*} type topic | comment
 */
export const CDN_RAKUEN = (topicId, type = 'topic') =>
  `${HOST_CDN}/gh/czy0729/Bangumi-Rakuen@master/data/${type}/${parseInt(
    parseInt(topicId) / 100
  )}/${topicId}.json`

/**
 * 头像CDN
 */
const avatarCache = {}
export const CDN_OSS_AVATAR = src => {
  if (typeof src !== 'string') {
    return src
  }

  if (avatarCache[src]) {
    return avatarCache[src]
  }

  // 修正图片地址
  let _src = src.split('?')[0]
  if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
    _src = `https:${_src}`
  }

  /**
   * 计算图片hash, 之后查询在不在OSS缓存里面
   * 计算规则: 带https://开头, 使用/m/质量, 去掉?后面的参数
   */
  const _hash = hash(_src)
  if (_hash in HASH_AVATAR) {
    const path = _hash.slice(0, 1).toLocaleLowerCase()
    const cdnSrc = `${HOST_CDN}/gh/czy0729/Bangumi-OSS@master/data/avatar/m/${path}/${_hash}.jpg`
    avatarCache[src] = cdnSrc
    return cdnSrc
  }

  avatarCache[src] = src
  return src
}
