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
import {initUser, IUserForm} from "@constants/types/user";
// --------------------------------------------------------------------
// Get - 유저 snapshot
// --------------------------------------------------------------------
export const getUser = async (uid: string) => {
  const userQuery = query(
    collection(dbService, "users"),
    where("uid", "==", uid)
  );

  const userSnapshot = await getDocs(userQuery)
    .then((data) => {
      console.log("getUser getDocs success");
      return data;
    })
    .catch((error) => console.log("getUser getDocs error ==> ", error));

  return userSnapshot;
};
// --------------------------------------------------------------------
// Get - 유저 전체 필드
// --------------------------------------------------------------------
export const getOneUserInfo = async (uid: string) => {
  const userSnapshot = await getUser(uid);
  return userSnapshot?.docs[0].data();
};

// --------------------------------------------------------------------
// Get - 유저의 ongoings 필드
// --------------------------------------------------------------------
export const getOneUserOngoings = async (uid: string) => {
  const userSnapshot = await getUser(uid);
  return userSnapshot?.docs[0].data().ongoings;
};

// --------------------------------------------------------------------
// Post - 구글 유저
// --------------------------------------------------------------------
export const postGoogleUserDoc = async (user: User) => {
  const userSnapshot = await getUser(user.uid);

  // user doc 에 정보가 존재하지 않으면 (구글로그인 첫 방문일 경우)
  if (userSnapshot?.docs.length === 0) {
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
export const updateUser = async (uid: string, obj: initUser) => {
  const userSnapshot = await getUser(uid);
  const [userDocId]: any = userSnapshot?.docs.map((doc) => doc.id);
  const userDocRef = doc(dbService, "users", userDocId);
  await updateDoc(userDocRef, obj)
    .then(() => console.log("updateUser updateDoc success"))
    .catch((error) => console.log("updateUser updateDoc error ==> ", error));
};

// --------------------------------------------------------------------
// Update - 한 개 유저 정보
// --------------------------------------------------------------------
export const updateOneUserInfo = async (
  uid: string,
  {company, email, phone, name}: IUserForm
) => {
  await updateUser(uid, {company, email, phone, name});
};

// --------------------------------------------------------------------
// Update - 한 개 유저의 ongoings 필드 수정
// --------------------------------------------------------------------
export const updateOngoingsId = async (uid: string, ongoingsID: string) => {
  const userInfo = await getOneUserInfo(uid);
  let ongoings: string[] = await userInfo?.ongoings;

  ongoings.push(ongoingsID);
  await updateUser(uid, {ongoings});
};
