// firebase
import {collection, deleteDoc, doc, setDoc} from "firebase/firestore";
import {dbService} from "src/fbase";
// contants
import {DocuKind, IContractor, IDocumentData} from "@constants/types/document";
// controller
import {addData} from "@controllers/firebase.util";

//--------------------------------------------------------------------------------
// Get - ongoings 문서 1개 조회
//--------------------------------------------------------------------------------
export const getOngoingDocu = () => {};

//--------------------------------------------------------------------------------
// Get - ongoings 문서 유저별 조회
//--------------------------------------------------------------------------------
export const getOngoingDocus = () => {};

//--------------------------------------------------------------------------------
// Post - ongoings 문서 생성
//--------------------------------------------------------------------------------
export const postOngoingDocu = () => {};

//--------------------------------------------------------------------------------
// Update - 임시 저장 / ongoings 문서 (docuContent, docuTitle) 수정
//--------------------------------------------------------------------------------
export const updateOngoingDocu = () => {};

//--------------------------------------------------------------------------------
// Delete - ongoings 문서 삭제
//--------------------------------------------------------------------------------
export const deleteOngoingDocu = () => {};
