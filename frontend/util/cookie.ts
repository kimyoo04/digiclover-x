import {Cookies} from "react-cookie";

const cookies = new Cookies();

type name = string;
type value = object;
type options = object;

export const setCookie = (name: name, value: value, options: options) => {
  return cookies.set(name, value, {...options});
};

export const getCookie = (name: name) => {
  return cookies.get(name);
};
