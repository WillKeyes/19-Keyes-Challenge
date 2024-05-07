import { openDB } from 'idb';

const initdb = async () => {
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });
};

// Function to add or update content in the database
export const putDb = async (content) => {
    try {
        const db = await openDB('jate', 1);
        const tx = db.transaction('jate', 'readwrite');
        const store = tx.objectStore('jate');
        const request = store.put({ id: 1, value: content });
        await request;
        console.log('Data saved to the database:', request);
        db.close();
    } catch (err) {
        console.error('putDb encountered an error:', err);
    }
};

// Function to get content from the database
export const getDb = async () => {
    try {
        const db = await openDB('jate', 1);
        const tx = db.transaction('jate', 'readonly');
        const store = tx.objectStore('jate');
        const request = store.get(1);
        const result = await request;
        console.log('Data retrieved from the database:', result);
        db.close();
        return result?.value;
    } catch (err) {
        console.error('getDb encountered an error:', err);
        return null;
    }
};

initdb();
