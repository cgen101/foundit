const BASE_URL = 'http://localhost:5000/';

/**
 * Fetch all lost items.
 * @returns {Promise<Array>} A promise resolving to the list of lost items.
 */
export const fetchLostItems = async () => {
    try {
        const response = await fetch(`${BASE_URL}lost_items`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch lost items');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching lost items:', error);
        return [];
    }
};

/**
 * Add a new lost item.
 * @param {Object} newItem - The lost item to add.
 * @param {string} newItem.name - Name of the lost item.
 * @param {string} newItem.color - Color of the lost item.
 * @param {string} newItem.category - Category of the lost item.
 * @param {string} newItem.description - Description of the lost item.
 * @returns {Promise<Object>} A promise resolving to the added item.
 */
export const addLostItem = async (newItem) => {
    try {
        const response = await fetch(`${BASE_URL}lost_items`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        if (!response.ok) {
            throw new Error('Failed to add lost item');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding lost item:', error);
        throw error;
    }
};
