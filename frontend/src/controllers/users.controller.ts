// firebase
import {User} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
// types
import {IUserForm} from "@constants/types/user";

// --------------------------------------------------------------------
// Get - 유저
// --------------------------------------------------------------------
export const getOneUserInfo = async (uid: string) => {
  const userQuery = query(
    collection(dbService, "users"),
    where("uid", "==", uid)
  );

  const querySnapshot = await getDocs(userQuery);
  const userInfo: any = querySnapshot.docs[0].data();

  return userInfo;
};

// --------------------------------------------------------------------
// Post - 구글 유저
// --------------------------------------------------------------------
export const postGoogleUserDoc = async (user: User) => {
  const userQuery = query(
    collection(dbService, "users"),
    where("uid", "==", user.uid)
  );
  const querySnapshot = await getDocs(userQuery);

  // user doc 에 정보가 존재하지 않으면 (구글로그인 첫 방문일 경우)
  if (querySnapshot.docs.length === 0) {
    // user doc 생성
    console.log("google user doc 생성");
    await addDoc(collection(dbService, "users"), {
      uid: user.uid,
      company: "",
      name: user.displayName,
      email: user.email,
      phoneL: "",
      providerId: user.providerData[0].providerId,
      ongoings: [],
      createdAt: Date.now() + 9 * 60 * 60 * 1000,
    });
  }
};

// --------------------------------------------------------------------
// Post - 로컬 유저
// --------------------------------------------------------------------
export const postLocalUserDoc = async (
  user: User,
  company: string,
  name: string,
  email: string,
  phone: string
) => {
  await addDoc(collection(dbService, "users"), {
    uid: user.uid,
    company,
    name,
    email,
    phone,
    providerId: user.providerData[0].providerId,
    ongoings: [],
    createdAt: Date.now() + 9 * 60 * 60 * 1000,
  });
};

// --------------------------------------------------------------------
// Update - 유저 정보
// --------------------------------------------------------------------
export const updateOneUserInfo = async (
  uid: string,
  {company, email, phone, name}: IUserForm
) => {
  const userQuery = query(
    collection(dbService, "users"),
    where("uid", "==", uid)
  );
  const querySnapshot = await getDocs(userQuery);
  const [userDocId]: any = querySnapshot.docs.map((doc) => {
    return doc.id;
  });
  const userDocRef = doc(dbService, "users", userDocId);
  await updateDoc(userDocRef, {company, email, phone, name});
};
