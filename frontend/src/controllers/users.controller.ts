// firebase
import {User} from "firebase/auth";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {dbService} from "src/fbase";

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
