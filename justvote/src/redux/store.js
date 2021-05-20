import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

/* 여러 미들웨어를 추가할 수 있도록  함. */
/* 필요한 미들웨어 추가 시 [ ] 안에 넣어주면 됨. */
const middleware = [logger, thunk]
/* 미들웨어  */
/* ... 연산자는 껍데기를 빼고 내용물 집어넣음 */

/* const store = createStore(rootReducer) */

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;