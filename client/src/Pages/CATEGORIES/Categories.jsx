import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useNavigate } from "react-router-dom";
import categoriesStyle from "./Categories.module.scss"
import useAxios from "../../Custom-hooks/useAxios";

const Categories = () => {
  const { categories } = useSelector((state) => state.blog);
  const { getData, getCategoryById } = useBlogData();
  const {axiosWithToken} = useAxios()
  const navigate = useNavigate();
  const [add, setAdd] = useState("")

  
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
  const addCategory = async (e)=>{
    e.preventDefault()
    const postData = {name:add}
    const data = await axiosWithToken.post("categories", postData)
    // console.log(data)
    getData("categories")
  }
  // console.log(add)

 
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
          
          <input type="text" name="category" onChange={(e)=>setAdd(e.target.value)}/>
          <button onClick={addCategory} type="submit">Add Category</button>
        </div>
        </div>
        
      </div>
    
  );
};

export default Categories;
