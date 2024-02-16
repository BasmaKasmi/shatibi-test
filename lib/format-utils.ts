interface Emargement {
  date: string; 
}

export const sortEmargementsByDateDesc = (emargements: Emargement[]): Emargement[] => {
  return [...emargements].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};



export const formatCourseName = (courseNameFromApi: string) => {
  if (courseNameFromApi) {
    return courseNameFromApi.replace("An", "").replace("DIS", "").trim();
  }
  return '';
}; 

export const getDayInitials = (slot: string) => {
  return slot.substr(0, 3);
};

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const removeLastLetter = (str: string): string => {
  if (!str) return '';
  return str.slice(0, -1);
};

