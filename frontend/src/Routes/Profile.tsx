// modules
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import styled from "styled-components";
// components
import {Col, Row, Wrapper} from "@components/layout";
import {ErrorMessage, Input, Label} from "@components/Auth/authStyle";
import ToggleIsDark from "@components/Util/ToggleIsDark";
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
import {useAppSelector} from "@app/hook";
import {IUser} from "@features/auth/authSlice";

export interface IUserForm {
  company: string;
  email: string;
  phone: string;
  name: string;
}

const ProfileWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & span {
    color: ${(props) => props.theme.textColor};
    font-weight: 700;
    font-size: 1.8rem;
  }

  & button {
    display: flex;
    align-items: center;

    background-color: transparent;
    border: none;

    font-size: 26px;
    color: ${(props) => props.theme.bgWhiteColor};

    & i {
      font-size: 2.2rem;
    }

    &.readOnly {
      color: ${(props) => props.theme.bgWhiteTransColor2};
    }
  }
`;

const InputLabel = styled(Label)`
  font-size: 1.4rem;
`;

const SaveButton = styled(Input)`
  margin-top: 10px;
  background-color: ${(props) => props.theme.primaryGreenColor};
  font-size: 16px;
  font-weight: 500;
`;

const Profile = () => {
  const [readOnly, setReadOnly] = useState(true);
  const [userData, setUserData] = useState<IUser>({
    company: "",
    name: "",
    email: "",
    phone: "",
    uid: "",
  });
  const user = useAppSelector((state) => state.auth.user);

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
  }, []);

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
          const userQuery = await query(
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
                maxLength: {
                  value: 35,
                  message: "company Name is too long.",
                },
              })}
              placeholder="company Name"
              name="company"
              type="text"
              readOnly={readOnly}
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
                maxLength: {
                  value: 35,
                  message: "Your email is too long.",
                },
              })}
              placeholder="Email"
              name="email"
              type="email"
              readOnly={readOnly}
            />
          </Col>

          <Col>
            <Row>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "Only phone number allowed",
                },
              })}
              placeholder="Phone"
              name="phone"
              type="tel"
              readOnly={readOnly}
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
                maxLength: {
                  value: 20,
                  message: "Your name is too long.",
                },
              })}
              placeholder="Name"
              name="name"
              type="text"
              readOnly={readOnly}
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

export default Profile;
