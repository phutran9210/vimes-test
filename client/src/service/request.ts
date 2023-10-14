import axios from "axios";
import { setupRequest, setupResponse } from "./interceptor";

const request = axios.create({
  baseURL: `http://localhost:8889`,
});

setupRequest(request);
setupResponse(request);

export default request;
