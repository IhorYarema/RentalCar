import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import css from "./App.module.css";
import Header from "./components/Header/Header";
import "@fontsource/manrope";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const CarViewPage = lazy(() => import("./pages/CarViewPage/CarViewPage"));

function App() {
  return (
    <div className={css.appWrapper}>
      <Header />
      <div className={css.pageContent}>
        {/* <Suspense fallback={<Loader />}> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CarViewPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        {/* </Suspense> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
