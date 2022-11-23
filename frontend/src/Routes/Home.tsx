// components
import {Wrapper} from "@components/layout";
// firebase
import {getRedirectResult, GoogleAuthProvider} from "firebase/auth";
import {authService} from "../fbase";
// controllers
import {postGoogleUserDoc} from "@controllers/users.controller";

const Home = () => {
  getRedirectResult(authService)
    .then((result) => {
      if (result) {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        if (token && user) {
          // oauth user doc 생성 함수 호출
          postGoogleUserDoc(user).catch((error) => console.error(error));
        }
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode, errorMessage, email, credential);
    });

  return <Wrapper></Wrapper>;
};

export default Home;
