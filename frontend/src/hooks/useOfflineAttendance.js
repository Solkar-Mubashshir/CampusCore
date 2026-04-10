import { useState, useEffect } from 'react'
import { saveAttendanceOffline, getPendingAttendance, markSynced } from '../utils/indexedDB'
import api from '../utils/api'

export function useOfflineAttendance() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [pendingCount, setPendingCount] = useState(0)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    const goOnline = () => { setIsOnline(true); syncPending() }
    const goOffline = () => setIsOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    loadPending()
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  const loadPending = async () => {
    const pending = await getPendingAttendance()
    setPendingCount(pending.length)
  }

  const markAttendance = async (record) => {
    if (isOnline) {
      try {
        await api.post('/teacher/attendance', record)
        return { success: true, mode: 'online' }
      } catch {
        await saveAttendanceOffline(record)
        await loadPending()
        return { success: true, mode: 'offline' }
      }
    } else {
      await saveAttendanceOffline(record)
      await loadPending()
      return { success: true, mode: 'offline' }
    }
  }

  const syncPending = async () => {
    setSyncing(true)
    try {
      const pending = await getPendingAttendance()
      for (const record of pending) {
        try {
          await api.post('/teacher/attendance/sync', record)
          await markSynced(record.id)
        } catch { /* skip failed */ }
      }
      await loadPending()
    } finally {
      setSyncing(false)
    }
  }

  return { isOnline, pendingCount, syncing, markAttendance, syncPending }
}