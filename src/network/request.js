/* 网络异步请求时，创建一个axios实例，并根据传入的config向服务端发送请求 */
import axios from 'axios';
export default function request(config)
{
  const instance = axios.create({
    baseURL: '/api'
  });
  return instance(config);
}