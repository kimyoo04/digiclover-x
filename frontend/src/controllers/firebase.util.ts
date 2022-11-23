// firebase
import {
  addDoc,
  collection,
  CollectionReference,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";

// --------------------------------------------------------------------
// Get data
// --------------------------------------------------------------------
export const getQueryData = async (
  userId: string | undefined,
  setQueryData: React.Dispatch<React.SetStateAction<null>>,
  tableName: string
) => {
  const q = query(
    collection(dbService, tableName),
    where("userId", "==", userId)
  );

  onSnapshot(q, (snapshot) => {
    const arr: any = snapshot.docs.map((data) => ({
      id: data.id,
      ...data.data(),
    }));
    setQueryData(arr);
  });
};

// --------------------------------------------------------------------
// add one Data
// --------------------------------------------------------------------
export const addData = async (tableName: string, dataObj: object) => {
  return addDoc(
    collection(dbService, tableName) as CollectionReference,
    dataObj
  );
};
