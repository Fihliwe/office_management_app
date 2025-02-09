const useStoredOffices = () => {
  if (typeof window !== "undefined") {       
    const stored = localStorage.getItem("offices");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            name: "Specno",
            color: "#0EA5E9",
            email: "info@specno.com",
            phone: "082 364 9984",
            capacity: 25,
            address: "10 Wille van Schoor Dr, Bo-Oakdale, Cape Town, 7530",
            staffMembers: [
              { id: 1, firstName: "Jacques", lastName: "Jordaan", avatar: "avatar1.png" },
              { id: 2, firstName: "Daniel", lastName: "Novitzkas", avatar: "avatar2.png" },
              { id: 3, firstName: "Brandon", lastName: "Watkins", avatar: "avatar3.png" },
              { id: 4, firstName: "Ryan", lastName: "Duell", avatar: "avatar4.png" },
              { id: 5, firstName: "Jenner", lastName: "Venter", avatar: "avatar5.png" },
              { id: 6, firstName: "Janke B", lastName: "Du Toit", avatar: "avatar6.png" },
            ],
          },
        ];
  }

  return [];
};

export default useStoredOffices;
