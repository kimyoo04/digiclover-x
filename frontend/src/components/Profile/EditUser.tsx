// modules
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
// components
import {Col, Row, Wrapper} from "@components/layout";
import {ErrorMessage, Input} from "@components/Auth/authStyle";
import ToggleIsDark from "@components/Util/ToggleIsDark";
// types
import {IUserForm} from "@constants/types/user";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// style
import {Header, InputLabel, ProfileWrapper, SaveButton} from "./EditUserStyle";
import {DocumentData} from "firebase/firestore";
// controller
import {getOneUserInfo, updateOneUserInfo} from "@controllers/users.controller";

const EditUser = () => {
  const [readOnly, setReadOnly] = useState(true);
  const [userData, setUserData] = useState<DocumentData | undefined>({
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

  // 회원 정보 저장 클릭시 호출
  const onValid = async (infoObj: IUserForm) => {
    setReadOnly((prev) => !prev);
    const {company, email, phone, name} = infoObj;
    // 유저 정보 수정했을 경우만 updateOneUserInfo 실행
    if (
      userData?.company !== company ||
      userData?.email !== email ||
      userData?.phone !== phone ||
      userData?.name !== name
    ) {
      if (user.id) {
        updateOneUserInfo(user.id, infoObj)
          .then(() => console.log("updateOneUserInfo updateDoc success"))
          .catch((error) => console.log("updateOneUserInfo error ==> ", error));
      } else {
        console.log("updateOneUserInfo - 유저 정보가 없습니다.");
      }
    }
  };

  // 로그인한 유저의 정보 조회
  useEffect(() => {
    if (user.id) {
      getOneUserInfo(user.id)
        // react-hook-form data update
        .then((userInfo) => {
          setUserData(userInfo);
          reset(userInfo);
        })
        .then(() => console.log("getOneUserInfo gerDocs success"))
        .catch((error) => console.log("getOneUserInfo error ==> ", error));
    } else {
      console.log("getOneUserInfo - 유저 정보가 없습니다.");
    }
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
