import axios from 'axios'

/* TODO: connectar mediante envs vars, android e ios */

const productsApi = axios.create({
  baseURL: 'localhost:3000/api'
})

/* TODO: interceptores */
export {productsApi}