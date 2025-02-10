const saveOffices = (offices) => {
    localStorage.setItem('offices', JSON.stringify(offices));
  };

export default saveOffices;