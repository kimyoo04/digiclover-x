// modules
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
// components
import {Col, Row, Wrapper} from "@components/layout";
import {ErrorMessage, Input} from "@components/Auth/authStyle";
import ToggleIsDark from "@components/Util/ToggleIsDark";
// types
import {IUser, IUserForm} from "@constants/types/user";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// firebase
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
// style
import {Header, InputLabel, ProfileWrapper, SaveButton} from "./EditUserStyle";

const EditUser = () => {
  const [readOnly, setReadOnly] = useState(true);
  const [userData, setUserData] = useState<IUser>({
    company: "",
    name: "",
    email: "",
    phone: "",
    uid: "",
    ongoings: [],
  });
  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<IUserForm>();

  // 1. 회원 정보 저장 클릭
  // 2. updateUser 수행
  // 3. 다시 getUser 수행
  // 4. reset 함수 실행
  const onValid = async ({company, email, phone, name}: IUserForm) => {
    setReadOnly((prev) => !prev);

    // 유저 정보 수정했을 경우만 PUT 요청 수행
    if (
      userData?.company !== company ||
      userData?.email !== email ||
      userData?.phone !== phone ||
      userData?.name !== name
    ) {
      // update userDoc
      const updateUser = async () => {
        if (user.id) {
          const userQuery = query(
            collection(dbService, "users"),
            where("uid", "==", user.id)
          );
          const querySnapshot = await getDocs(userQuery);
          const [userDocId]: any = querySnapshot.docs.map((doc) => {
            return doc.id;
          });
          const userDocRef = doc(dbService, "users", userDocId);
          await updateDoc(userDocRef, {company, email, phone, name});
        }
      };
      updateUser();
    }
  };

  // 로그인한 유저의 정보 input에 reset
  useEffect(() => {
    // get userDoc
    const getUser = async () => {
      const userQuery = query(
        collection(dbService, "users"),
        where("uid", "==", user.id)
      );
      const querySnapshot = await getDocs(userQuery);
      const data: any = querySnapshot.docs[0].data();

      if (data) {
        // 폼에 입력
        setUserData(data);
        // 폼에 입력
        reset(data);
      }
    };
    getUser().catch((error) => console.log(error));
  }, [reset, user.id]);

  return (
    <Wrapper>
      <ProfileWrapper>
        <Header>
          <span>회원정보</span>
          {readOnly ? (
            <button
              className="readOnly"
              onClick={() => setReadOnly((prev) => !prev)}
            >
              <i className="ri-edit-2-fill"></i>
            </button>
          ) : (
            <button onClick={() => setReadOnly((prev) => !prev)}>
              <i className="ri-edit-2-fill"></i>
            </button>
          )}
        </Header>

        <form id="docuTitleForm" onSubmit={handleSubmit(onValid)}>
          <Col>
            <Row>
              <InputLabel htmlFor="company">Company</InputLabel>
              <ErrorMessage>{errors?.company?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("company", {
                required: "company Name is required",
              })}
              placeholder="* company Name"
              name="company"
              type="text"
              readOnly={readOnly}
              maxLength={35}
            />
          </Col>

          <Col>
            <Row>
              <InputLabel htmlFor="email">Email</InputLabel>
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "Only emails allowed",
                },
              })}
              placeholder="* Email"
              name="email"
              type="email"
              readOnly={readOnly}
              maxLength={35}
            />
          </Col>

          <Col>
            <Row>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("phone", {
                onChange: (e) => {
                  if (e.target.value.length === 10) {
                    reset({
                      phone: e.target.value.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        "$1-$2-$3"
                      ),
                    });
                  }
                  if (e.target.value.length === 13) {
                    reset({
                      phone: e.target.value
                        .replace(/-/g, "")
                        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
                    });
                  }
                },
                required: "Phone number is required",
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "Only phone number allowed",
                },
              })}
              placeholder="* Phone (000-0000-0000)"
              name="phone"
              type="tel"
              maxLength={13}
            />
          </Col>

          <Col>
            <Row>
              <InputLabel htmlFor="name">Name</InputLabel>
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="* Name"
              name="name"
              type="text"
              readOnly={readOnly}
              maxLength={25}
            />
          </Col>
        </form>

        {!readOnly ? (
          <SaveButton form="docuTitleForm" type="submit" value="프로필 저장" />
        ) : null}
      </ProfileWrapper>
      <ToggleIsDark />
    </Wrapper>
  );
};

export default EditUser;
