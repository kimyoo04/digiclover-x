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
// Get - 유저 정보
// --------------------------------------------------------------------
export const getOneUserInfo = async (uid: string) => {
  const userQuery = query(
    collection(dbService, "users"),
    where("uid", "==", uid)
  );

  const querySnapshot = await getDocs(userQuery)
    .then((data) => {
      console.log("getOneUserInfo getDocs success");
      return data;
    })
    .catch((error) => console.log("getOneUserInfo getDocs error ==> ", error));

  return querySnapshot?.docs[0].data();
};

// --------------------------------------------------------------------
// Post - 구글 유저
// --------------------------------------------------------------------
export const postGoogleUserDoc = async (user: User) => {
  const userQuery = query(
    collection(dbService, "users"),
    where("uid", "==", user.uid)
  );
  const querySnapshot = await getDocs(userQuery)
    .then((data) => {
      console.log("postGoogleUserDoc getDocs success");
      return data;
    })
    .catch((error) =>
      console.log("postGoogleUserDoc getDocs error ==> ", error)
    );

  // user doc 에 정보가 존재하지 않으면 (구글로그인 첫 방문일 경우)
  if (querySnapshot?.docs.length === 0) {
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
    })
      .then((data) => {
        console.log("postGoogleUserDoc addDoc success");
        return data;
      })
      .catch((error) =>
        console.log("postGoogleUserDoc addDoc error ==> ", error)
      );
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
  })
    .then((data) => {
      console.log("postLocalUserDoc addDoc success");
      return data;
    })
    .catch((error) => console.log("postLocalUserDoc addDoc error ==> ", error));
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

  const userSnapshot = await getDocs(userQuery)
    .then((data) => {
      console.log("updateOneUserInfo getDocs success");
      return data;
    })
    .catch((error) =>
      console.log("updateOneUserInfo getDocs error ==> ", error)
    );

  const [userDocId]: any = userSnapshot?.docs.map((doc) => doc.id);
  const userDocRef = doc(dbService, "users", userDocId);
  await updateDoc(userDocRef, {company, email, phone, name})
    .then((data) => {
      console.log("updateOneUserInfo updateDoc success");
      return data;
    })
    .catch((error) =>
      console.log("updateOneUserInfo updateDoc error ==> ", error)
    );
};

// --------------------------------------------------------------------
// Update - user doc의 ongoings 필드 수정
// --------------------------------------------------------------------
export const updateOngoingsId = async (uid: string, ongoingsID: string) => {
  const userInfo = await getOneUserInfo(uid);
  let ongoings: string[] = await userInfo?.ongoings;

  ongoings.push(ongoingsID);

  const userQuery = query(
    collection(dbService, "users"),
    where("uid", "==", uid)
  );

  const userSnapshot = await getDocs(userQuery)
    .then((data) => {
      console.log("updateOngoingsId getDocs success");
      return data;
    })
    .catch((error) =>
      console.log("updateOngoingsId getDocs error ==> ", error)
    );

  const [userDocId]: any = userSnapshot?.docs.map((doc) => doc.id);
  const userDocRef = doc(dbService, "users", userDocId);
  await updateDoc(userDocRef, {ongoings})
    .then(() => console.log("updateOngoingsId updateDoc success"))
    .catch((error) =>
      console.log("updateOngoingsId updateDoc error ==> ", error)
    );
};
