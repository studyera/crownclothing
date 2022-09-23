import "./category.styles.scss";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CategoriesContext } from "../../context/categories.context";
import { selectCategoriesMap } from "../../store/categories/categories.selector";
import { selectIsCategoriesLoading } from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";
import ProductCard from "../../components/product-card/product-card.component";
const Category = () => {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const isCategoriesLoading = useSelector(selectIsCategoriesLoading)
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
    {isCategoriesLoading ? <Spinner /> :<>
    <h2 className="category-title">{category.toUpperCase()}</h2>
    <div className="category-container">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  </>}
  </>
  );
};

export default Category;
