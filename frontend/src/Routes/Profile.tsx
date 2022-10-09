import {Col, Row, Wrapper} from "Components/layout";
import {ErrorMessage, Input, Label} from "Components/Auth/auth";
import {useState} from "react";
import {useForm} from "react-hook-form";

import {useQuery} from "react-query";
import UserDataService from "services/user";
import styled from "styled-components";

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
    font-size: 20px;
  }

  & button {
    background-color: transparent;
    border: none;

    font-size: 26px;
    color: ${(props) => props.theme.bgWhiteTransColor2};

    &.readOnly {
      color: white;
    }
  }
`;

const SaveButton = styled(Input)`
  margin-top: 10px;
  background-color: ${(props) => props.theme.primaryGreenColor};
  font-size: 16px;
  font-weight: 500;
`;

const Profile = () => {
  const [readOnly, setReadOnly] = useState(true);

  // 로그인 유저 정보 fetch
  // 현재 수정해서 PUT 요청 완료 후 새로고침 해야만 제대로 받아온다.
  const {
    data: userData,
    isLoading: isUserDataLoading,
    refetch,
  } = useQuery(["info", "user"], () => UserDataService.getOneUser(), {
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IUserForm>({
    defaultValues: {
      company: userData?.company,
      email: userData?.email,
      phone: userData?.phone,
      name: userData?.name,
    },
  });

  // 1. 버튼을 수정으로 바꾼다.
  // 2. PUT 요청을 보낸다.
  // 3. useQuery를 refetch 한다.
  const onValid = async (data: IUserForm) => {
    setReadOnly((prev) => !prev);

    // 유저 정보 수정했을 경우만 PUT 요청 수행
    if (
      userData.company !== data.company ||
      userData.email !== data.email ||
      userData.phone !== data.phone ||
      userData.name !== data.name
    ) {
      await UserDataService.updateOneUser(data);
      await refetch();
    }
  };

  return isUserDataLoading ? null : (
    <Wrapper>
      <ProfileWrapper>
        <Header>
          <span>프로필 정보</span>
          {readOnly ? (
            <button
              className="readOnly"
              onClick={() => setReadOnly((prev) => !prev)}
            >
              <i className="ri-edit-2-line"></i>
            </button>
          ) : (
            <button onClick={() => setReadOnly((prev) => !prev)}>
              <i className="ri-edit-2-line"></i>
            </button>
          )}
        </Header>

        <form id="docuTitleForm" onSubmit={handleSubmit(onValid)}>
          <Col>
            <Row>
              <Label htmlFor="company">Company</Label>
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
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="phone">Phone</Label>
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
              <Label htmlFor="name">Name</Label>
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
    </Wrapper>
  );
};

export default Profile;
