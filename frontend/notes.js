const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const fetchNotes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/notes`);
    if (!response.ok) throw new Error('Failed to fetch notes');
    return response.json();
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

export const saveNote = async (note) => {
  try {
    const response = await fetch(`${API_URL}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error('Failed to save note');
    return response.json();
  } catch (error) {
    console.error('Error saving note:', error);
    return null;
  }
};

export const updateNote = async (id, updatedNote) => {
  try {
    const response = await fetch(`${API_URL}/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote),
    });
    if (!response.ok) throw new Error('Failed to update note');
    return response.json();
  } catch (error) {
    console.error('Error updating note:', error);
    return null;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete note');
    return response.json();
  } catch (error) {
    console.error('Error deleting note:', error);
    return null;
  }
};