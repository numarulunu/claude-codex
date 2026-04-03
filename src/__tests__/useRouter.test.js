import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRouter } from '../hooks/useRouter'

describe('useRouter', () => {
  beforeEach(() => {
    window.location.hash = ''
  })

  it('returns home route when hash is empty', () => {
    const { result } = renderHook(() => useRouter())
    expect(result.current.route).toBe('home')
    expect(result.current.params).toEqual({})
  })

  it('parses module route', () => {
    window.location.hash = '#/module/01-cli-fundamentals'
    const { result } = renderHook(() => useRouter())
    expect(result.current.route).toBe('module')
    expect(result.current.params.moduleId).toBe('01-cli-fundamentals')
  })

  it('parses lesson route', () => {
    window.location.hash = '#/module/01-cli-fundamentals/lesson/cli-01-03'
    const { result } = renderHook(() => useRouter())
    expect(result.current.route).toBe('lesson')
    expect(result.current.params.moduleId).toBe('01-cli-fundamentals')
    expect(result.current.params.lessonId).toBe('cli-01-03')
  })

  it('navigates by updating hash', () => {
    const { result } = renderHook(() => useRouter())
    act(() => {
      result.current.navigate('/module/01-cli-fundamentals')
    })
    expect(window.location.hash).toBe('#/module/01-cli-fundamentals')
  })
})
