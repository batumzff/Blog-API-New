import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useNavigate } from "react-router-dom";
import categoriesStyle from "./Categories.module.scss"

const Categories = () => {
  const { categories } = useSelector((state) => state.blog);
  const { getData, getCategoryById } = useBlogData();
  const navigate = useNavigate();

  
  useEffect(() => {
    getData("categories");
  }, []);
  console.log(categories);

  const handleClick = async (categoryId) => {
    // console.log(categoryId);
    try {
      const data = await getCategoryById("categoryDetail", categoryId);
      // console.log(data);
      navigate("/category-detail");

    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    
      <div className={categoriesStyle.container}>
        <div>
          <h3>Your site Your Choice</h3>
        <div className={categoriesStyle.categories}>
          {categories?.map((category) => (
            <h3 onClick={() => handleClick(category._id)}>{category.name} </h3>
          ))}
        </div>
        <div>
          <h4>Add Category</h4>
          <input type="text"  />
        </div>
        </div>
        
      </div>
    
  );
};

export default Categories;
