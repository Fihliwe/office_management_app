const saveOffices = (offices) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('offices', JSON.stringify(offices));
  }
};

export default saveOffices;
