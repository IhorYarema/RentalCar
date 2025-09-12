// import css from "./Filters.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import Select from "react-select";

// const Filters = () => {
//   const dispatch = useDispatch();

//   const brandsOptions = brands.map((brand) => ({
//     value: brand.name,
//     label: brand.name,
//   }));

//   const pricesOptions = categories.map((category) => ({
//     value: category.name,
//     label: category.name,
//   }));

//   //   const mileageOptions = brands.map((brand) => ({
//   //     value: brand.name,
//   //     label: brand.name,
//   //   }));

//   const handleResetFilters = () => {
//     dispatch(clearitems());
//     dispatch(resetFilters());
//     setSelectedCategory(null);
//     setSelectedIngredients([]);
//     dispatch(fetchRecipes());
//     dispatch(setSearchQuery(""));
//   };

//   const onCategoryChange = (selectedOption) => {
//     setSelectedCategory(selectedOption);
//     dispatch(setCategoryFilter(selectedOption ? selectedOption.value : ""));
//     dispatch(clearitems());
//     dispatch(fetchRecipes());
//   };

//   const onIngredientsChange = (selectedOptions) => {
//     setSelectedIngredients(selectedOptions || []);
//     const ingredientValues = selectedOptions
//       ? selectedOptions.map((option) => option.value)
//       : [];
//     dispatch(setIngredientsFilter(ingredientValues));
//     dispatch(clearitems());
//     dispatch(fetchRecipes());
//   };

//   const toggleFilters = () => {
//     setIsFilterOpen(!isFilterOpen);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1440) setIsFilterOpen(false);
//     };

//     window.addEventListener("resize", handleResize);

//     handleResize();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const customStyles = {
//     container: (provided) => ({
//       ...provided,
//       cursor: "pointer",
//     }),
//     control: (provided) => ({
//       ...provided,
//       cursor: "pointer",
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       cursor: "pointer",
//       backgroundColor: state.isSelected ? "#e6f0ff" : provided.backgroundColor,
//     }),
//     indicatorSeparator: () => ({
//       display: "none",
//     }),
//   };

//   return (
//     <div className={css.filtersSection}>
//       <h2 className={css.title}>
//         {title ? `Search Results for “${title}”` : "Recipes"}
//       </h2>
//       <div className={css.filtersContainerWrapper}>
//         <div className={css.filtersContainer}>
//           {!loader && (
//             <p className={css.recipesCount}>{recipesAmount} recipes</p>
//           )}

//           <button
//             type="button"
//             className={css.toggleBtn}
//             onClick={toggleFilters}
//           >
//             Filters
//             <svg className={css.filtersIcon}>
//               {isFilterOpen ? (
//                 <use href="/icons.svg#icon-close" />
//               ) : (
//                 <use href="/icons.svg#icon-filter" />
//               )}
//             </svg>
//           </button>
//         </div>

//         <div
//           className={`${css.filtersContent} ${
//             isFilterOpen ? css.open : css.hidden
//           }`}
//         >
//           <div className={css.selectContainer}>
//             <Select
//               components={animatedComponents}
//               options={categoriesOptions}
//               value={selectedCategory}
//               onChange={onCategoryChange}
//               placeholder="Category"
//               isClearable
//               styles={customStyles}
//             />
//           </div>

//           <div className={css.selectContainer}>
//             <Select
//               components={animatedComponents}
//               options={ingredientsOptions}
//               value={selectedIngredients}
//               onChange={onIngredientsChange}
//               placeholder="Ingredient"
//               isMulti
//               styles={customStyles}
//             />
//           </div>
//           <button
//             type="button"
//             onClick={handleResetFilters}
//             className={css.resetButton}
//           >
//             Reset filters
//           </button>
//         </div>
//       </div>
//       {recipesAmount === 0 && !loader && (
//         <div className={css.noRecipesContainer}>
//           <h3 className={css.noRecipesTitle}>
//             We’re sorry! We were not able to find a match.
//           </h3>
//           <button
//             type="button"
//             className={css.noRecipesResetBtn}
//             onClick={handleResetFilters}
//           >
//             Reset search and filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Filters;
