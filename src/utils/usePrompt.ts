/**
 * These hooks re-implement the now removed useBlocker and usePrompt hooks in 'react-router-dom'.
 */
import { useContext, useEffect, useCallback, ContextType, useState } from 'react'
import {
  UNSAFE_NavigationContext as NavigationContext,
  Navigator as BaseNavigator,
  useNavigate,
} from 'react-router-dom'
import type { History, Transition } from 'history'

interface Navigator extends BaseNavigator {
  block: History['block']
}

type NavigationContextWithBlock = ContextType<typeof NavigationContext> & { navigator: Navigator }

export function useBlocker(blocker, when = true) {
  const { navigator } = useContext(NavigationContext) as NavigationContextWithBlock

  useEffect(() => {
    if (!when) return

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // Automatically unblock the transition so it can play all the way
          // through before retrying it. TODO: Figure out how to re-enable
          // this block if the transition is cancelled for some reason.
          unblock()
          tx.retry()
        },
      }

      blocker(autoUnblockingTx)
    })

    return unblock
  }, [navigator, blocker, when])
}

/**
 * Prompts the user with an Alert before they leave the current screen.
 *
 * @param  message
 * @param  when
 */
export function usePrompt(
  message: string | ((location: Transition['location'], action: Transition['action']) => string),
  when = true
) {
  const blocker = useCallback(
    (tx: Transition) => {
      let response
      if (typeof message === 'function') {
        response = message(tx.location, tx.action)
        if (typeof response === 'string') {
          response = window.confirm(response)
        }
      } else {
        response = window.confirm(message)
      }
      if (response) {
        tx.retry()
      }
    },
    [message]
  )
  return useBlocker(blocker, when)
}

export const useConfirmNavigate = () => {
  const navigate = useNavigate()
  const [isEnablePrompt, setIsEnablePrompt] = useState<boolean>(true)
  const [pathTarget, setPathTarget] = useState<string>('')
  const [isVisibleModalCancel, setIsVisibleModalCancel] = useState<boolean>(false)

  const handleGoBack = (urlBack) => {
    setIsEnablePrompt(false)
    setIsVisibleModalCancel(false)

    setTimeout(() => {
      const to = pathTarget ? pathTarget : urlBack
      navigate(to)
    }, 0)
  }

  const handleCloseModalCancel = () => {
    setIsVisibleModalCancel(false)
    setIsEnablePrompt(true)
    setPathTarget('')
  }

  const onHandleCancel = (isEdit, url) => {
    if (isEdit) navigate(url)
    else setIsVisibleModalCancel(true)
  }

  return {
    isEnablePrompt,
    isVisibleModalCancel,
    onHandleCancel,
    handleCloseModalCancel,
    handleGoBack,
    setPathTarget,
    setIsVisibleModalCancel,
    setIsEnablePrompt,
  }
}
