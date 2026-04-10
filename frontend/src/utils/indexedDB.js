const DB_NAME = 'CampusCore';
const STORE_NAME = 'attendanceOffline';
const VERSION = 1;

let db = null;

// Initialize IndexedDB
export const initIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('syncedAt', 'syncedAt', { unique: false });
      }
    };
  });
};

// Add attendance record to offline storage
export const addOfflineAttendance = (record) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('IndexedDB not initialized'));
      return;
    }

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add({
      ...record,
      timestamp: new Date().toISOString(),
      synced: false,
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// Get all offline attendance records
export const getOfflineAttendance = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('IndexedDB not initialized'));
      return;
    }

    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// Get unsyced offline records
export const getUnsyncedAttendance = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('IndexedDB not initialized'));
      return;
    }

    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const unsynced = request.result.filter(record => !record.synced);
      resolve(unsynced);
    };
  });
};

// Mark records as synced
export const markAsSynced = (ids) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('IndexedDB not initialized'));
      return;
    }

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    ids.forEach(id => {
      const request = store.get(id);
      request.onsuccess = () => {
        const record = request.result;
        record.synced = true;
        store.put(record);
      };
    });

    transaction.onerror = () => reject(transaction.error);
    transaction.oncomplete = () => resolve(true);
  });
};

// Clear offline storage
export const clearOfflineAttendance = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('IndexedDB not initialized'));
      return;
    }

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(true);
  });
};

// Register Service Worker for offline support
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('Service Worker registration failed:', err);
    });
  }
};