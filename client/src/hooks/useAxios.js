import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

const actionTypes = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
}

const { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } = actionTypes

const fetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false }
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
        status: action.payload.status,
      }
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      throw new Error()
  }
}

const useAxios = (
  initialUrl = null,
  initialAxiosOptions = {},
  initialData = null,
) => {
  const [url, setUrl] = useState(initialUrl)
  const [axiosOptions, setAxiosOptions] = useState(initialAxiosOptions)

  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
    status: null,
  })

  useEffect(() => {
    let didCancel = false

    const fetchData = async () => {
      dispatch({ type: FETCH_INIT })

      try {
        const result = await axios(url, axiosOptions)

        if (!didCancel) {
          dispatch({ type: FETCH_SUCCESS, payload: result })
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: FETCH_FAILURE })
        }
      }
    }

    if (url) fetchData()

    return () => {
      didCancel = true
    }
  }, [url, axiosOptions])

  const doFetch = (url, axiosOptions = {}) => {
    setUrl(url)
    setAxiosOptions(axiosOptions)
  }

  return { ...state, doFetch }
}

export default useAxios
