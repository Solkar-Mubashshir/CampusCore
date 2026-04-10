const DB_NAME = 'campuscore_offline'
const DB_VERSION = 1
const STORE = 'attendance'

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = e => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true })
      }
    }
    req.onsuccess = e => resolve(e.target.result)
    req.onerror = () => reject(req.error)
  })
}

export async function saveAttendanceOffline(record) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).add({
      ...record,
      timestamp: new Date().toISOString(),
      synced: false,
    })
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getPendingAttendance() {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).getAll()
    req.onsuccess = () => resolve(req.result.filter(r => !r.synced))
    req.onerror = () => reject(req.error)
  })
}

export async function markSynced(id) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const store = tx.objectStore(STORE)
    const req = store.get(id)
    req.onsuccess = () => {
      const record = req.result
      record.synced = true
      store.put(record)
    }
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}