/* 网络异步请求时，创建一个axios实例，并根据传入的config向服务端发送请求 */
import axios from 'axios';
export default function request(config)
{
  const instance = axios.create({
    //由于进行前端重置时，使用的依旧是旧项目中的api
    //在vue.config.js中有关跨域的配置
    baseURL: '/api'
  });
  return instance(config);
}