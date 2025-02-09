import { useEffect, useState } from "react";

const useStoredOffices = () => {
  const [undefined, setUndefined] = useState(false);

  useEffect(() => {
    setUndefined(true)
  }, []);
  if (typeof window !== undefined){       
    const stored = localStorage.getItem('offices');
    return stored ? JSON.parse(stored) : [
      {
        id: 1,
        name: 'Specno',
        color: '#0EA5E9',
        email: 'info@specno.com',
        phone: '082 364 9984',
        capacity: 25,
        address: '10 Wille van Schoor Dr, Bo-Oakdale, Cape Town, 7530',
        staffMembers: [
          { id: 1, firstName: 'Jacques', lastName: 'Jordaan', Avatar1},
          { id: 2, firstName: 'Daniel', lastName: 'Novitzkas', avatar: 2 },
          { id: 3, firstName: 'Brandon', lastName: 'Watkins', avatar: 3 },
          { id: 4, firstName: 'Ryan', lastName: 'Duell', avatar: 4 },
          { id: 5, firstName: 'Jenner', lastName: 'Venter', avatar: 5 },
          { id: 6, firstName: 'Janke B', lastName: 'Du Toit', avatar: 6 }
        ]
      }
    ];
  }

  return [];
};

export default useStoredOffices;
