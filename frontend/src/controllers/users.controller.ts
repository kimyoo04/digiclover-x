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
export const getOneUser = async (uid: string) => {
  let userSnapshot;

  try {
    const userQuery = query(
      collection(dbService, "users"),
      where("uid", "==", uid)
    );

    userSnapshot = await getDocs(userQuery)
      .then((data) => {
        console.log("getOneUser getDocs success");
        return data;
      })
      .catch((error) => console.error("getOneUser getDocs error ==> ", error));
  } catch (error) {
    console.error("getOneUser error ==> ", error);
  }
  console.log("getOneUser success");
  return userSnapshot;
};

// --------------------------------------------------------------------
// Get - 유저 전체 필드
// --------------------------------------------------------------------
export const getOneUserInfo = async (uid: string) => {
  let userSnapshot;

  try {
    userSnapshot = await getOneUser(uid);
  } catch (error) {
    console.error("getOneUserInfo error ==> ", error);
  }

  console.log("getOneUserInfo success");
  return userSnapshot?.docs[0].data();
};

// --------------------------------------------------------------------
// Post - 구글 유저
// --------------------------------------------------------------------
export const postGoogleUserDoc = async (user: User) => {
  try {
    const userSnapshot = await getOneUser(user.uid);

    // user doc 에 정보가 존재하지 않으면 (구글로그인 첫 방문일 경우)
    if (userSnapshot?.docs.length === 0) {
      // user doc 생성
      await addDoc(collection(dbService, "users"), {
        uid: user.uid,
        company: "",
        name: user.displayName,
        email: user.email,
        phoneL: "",
        providerId: user.providerData[0].providerId,
        createdAt: Date.now() + 9 * 60 * 60 * 1000,
      })
        .then((data) => {
          console.log("postGoogleUserDoc addDoc success");
          return data;
        })
        .catch((error) =>
          console.error("postGoogleUserDoc addDoc error ==> ", error)
        );
    } else {
      console.log("구글 계정 로그인");
    }
  } catch (error) {
    console.error("postGoogleUserDoc error ==> ", error);
  }
  console.log("postGoogleUserDoc success");
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
  try {
    await addDoc(collection(dbService, "users"), {
      uid: user.uid,
      company,
      name,
      email,
      phone,
      providerId: user.providerData[0].providerId,
      createdAt: Date.now() + 9 * 60 * 60 * 1000,
    })
      .then((data) => {
        console.log("postLocalUserDoc addDoc success");
        return data;
      })
      .catch((error) =>
        console.error("postLocalUserDoc addDoc error ==> ", error)
      );
  } catch (error) {
    console.error("postLocalUserDoc error ==> ", error);
  }
  console.log("postLocalUserDoc success");
};

// --------------------------------------------------------------------
// Update - 1개 유저 수정
// --------------------------------------------------------------------
export const updateUser = async (uid: string, obj: initUser) => {
  try {
    const userSnapshot = await getOneUser(uid);
    const [userDocId]: any = userSnapshot?.docs.map((doc) => doc.id);
    const userDocRef = doc(dbService, "users", userDocId);
    await updateDoc(userDocRef, obj)
      .then(() => console.log("updateUser updateDoc success"))
      .catch((error) =>
        console.error("updateUser updateDoc error ==> ", error)
      );
  } catch (error) {
    console.error("updateUser error ==> ", error);
  }
  console.log("updateUser success");
};

// --------------------------------------------------------------------
// Update - 1개 유저 정보 수정
// --------------------------------------------------------------------
export const updateOneUserInfo = async (
  uid: string,
  {company, email, phone, name}: IUserForm
) => {
  try {
    await updateUser(uid, {company, email, phone, name})
      .then(() => console.log("updateOneUserInfo updateDoc success"))
      .catch((error) =>
        console.error("updateOneUserInfo updateDoc error ==> ", error)
      );
  } catch (error) {
    console.error("updateOneUserInfo error ==> ", error);
  }
  console.log("updateOneUserInfo success");
};
