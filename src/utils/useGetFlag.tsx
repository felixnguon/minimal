import React from 'react'
import JapanFlagIcon from '@/assets/icons/ico_flag-japan.svg'
import TaiwanFlagIcon from '@/assets/icons/ico_flag-taiwan.svg'
import ChinaFlagIcon from '@/assets/icons/ico_flag-china.svg'
import KoreanFlagIcon from '@/assets/icons/ico_flag-korean.svg'
import MalayFlagIcon from '@/assets/icons/ico_flag-malay.svg'
import IndoFlagIcon from '@/assets/icons/ico_flag-indo.svg'
import ThailandFlagIcon from '@/assets/icons/ico_flag-thailand.svg'
import VietNamFlagIcon from '@/assets/icons/ico_flag-vietnam.svg'
import EnglandFlagIcon from '@/assets/icons/ico_flag-england.svg'

export const getFlag = (code, width = 'auto', height = 'auto') => {
  switch (code) {
    case 'jp':
      return <JapanFlagIcon style={{ width, height }} />
      break
    case 'tw':
      return <TaiwanFlagIcon style={{ width, height }} />
      break
    case 'cn':
      return <ChinaFlagIcon style={{ width, height }} />
      break
    case 'kr':
      return <KoreanFlagIcon style={{ width, height }} />
      break
    case 'my':
      return <MalayFlagIcon style={{ width, height }} />
      break
    case 'id':
      return <IndoFlagIcon style={{ width, height }} />
      break
    case 'th':
      return <ThailandFlagIcon style={{ width, height }} />
      break
    case 'vn':
      return <VietNamFlagIcon style={{ width, height }} />
      break
    case 'en':
      return <EnglandFlagIcon style={{ width, height }} />
      break
    default:
      return <></>
      break
  }
}
