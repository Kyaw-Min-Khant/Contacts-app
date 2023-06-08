import { collection, collectionGroup, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./DataConfig/firestore";
import Login from "./Login";
const Test = () => {
  const UserCollcectionRef = collection(db, "User2");
  const [user, setUser] = useState([]);
  const getUserData = async () => {
    try {
      const data = await getDocs(UserCollcectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUser(filterData);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <Login />
      <h2 className="">Data Input</h2>
      {user.map((user, i) => (
        <div key={i}>
          <h2 className="text-3xl">{user.Name}</h2>
          <h2 className="text-3xl">{user.Email}</h2>
          <h2 className="text-3xl">{user.note}</h2>
        </div>
      ))}
    </div>
  );
};

export default Test;
