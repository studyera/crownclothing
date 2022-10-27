
import React from "react";
import { CategoriesContext } from "../../context/categories.context";
import "./categories-preview.styles.scss";
import { useContext } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoriesMap,selectIsCategoriesLoading } from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";
const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap= useSelector(selectCategoriesMap);
  const isCategoriesLoading= useSelector(selectIsCategoriesLoading);
  return (
    <React.Fragment>
     {
      isCategoriesLoading? <Spinner />:( Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      }))
     }
      
    </React.Fragment>
  );
};


export default CategoriesPreview;
