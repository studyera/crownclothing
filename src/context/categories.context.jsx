import { createContext, useEffect, useState } from "react";
// import SHOP_DATA from "../shop.data.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };
  useEffect(()=>{
    const getCategoriesMap= async ()=>{
       const categoryMap = await getCategoriesAndDocuments();
       setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  },[])
//   useEffect(()=>{
//     addCollectionAndDocuments('categories', SHOP_DATA);
//   },[]);
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
