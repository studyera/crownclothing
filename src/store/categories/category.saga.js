import { takeLatest,all,call,put} from 'redux-saga/effects'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategorySuccess,fetchCategoryFailed } from './categories.action';

import { CATEGORIES_ACTION_TYPES } from './categories.types';

// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoryStart());
//     try {
//       const categoriesArray = await getCategoriesAndDocuments();
//       dispatch(fetchCategorySuccess(categoriesArray));
//     } catch (error) {
//       dispatch(fetchCategoryFailed(error));
//     }
//   };
  
 export function* fetchCategoriesAsync(){
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(fetchCategorySuccess(categoriesArray));
      } catch (error) {
        yield put(fetchCategoryFailed(error));
      }
 }

  export function* onFetchCategories(){
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsync)
  }

  export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
  }