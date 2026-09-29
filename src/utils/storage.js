const STORAGE_KEY_PROFILE = 'findx10_user_profile';
const STORAGE_KEY_PROGRESS = 'findx10_training_progress';

export const getUserProfile = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to load user profile from localStorage:', e);
    return null;
  }
};

export const saveUserProfile = (profile) => {
  try {
    const dataToSave = {
      ...profile,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(dataToSave));
    return dataToSave;
  } catch (e) {
    console.error('Failed to save user profile to localStorage:', e);
    return null;
  }
};

export const clearUserProfile = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
    localStorage.removeItem('module1_complete');
    localStorage.removeItem('module2_complete');
    localStorage.removeItem('module-1_complete');
    localStorage.removeItem('module-2_complete');
  } catch (e) {
    console.error('Failed to clear profile from localStorage:', e);
  }
};

export const getTrainingProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to load progress:', e);
    return {};
  }
};

export const isModuleCompleted = (moduleId) => {
  try {
    const cleanModId = (moduleId || '').replace('-', '');
    if (localStorage.getItem(`${cleanModId}_complete`) === 'true') return true;
    if (localStorage.getItem(`${moduleId}_complete`) === 'true') return true;
    const progress = getTrainingProgress();
    return !!progress[moduleId]?.completed;
  } catch (e) {
    return false;
  }
};

export const saveModuleProgress = (moduleId, score, totalQuestions) => {
  try {
    // Explicitly set module completion flags (e.g. module1_complete: true)
    const cleanModId = (moduleId || 'module-1').replace('-', '');
    localStorage.setItem(`${cleanModId}_complete`, 'true');
    localStorage.setItem(`${moduleId}_complete`, 'true');

    const current = getTrainingProgress();
    const updated = {
      ...current,
      [moduleId]: {
        completed: true,
        score,
        totalQuestions,
        completedAt: new Date().toISOString()
      }
    };
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save module progress:', e);
    return null;
  }
};
