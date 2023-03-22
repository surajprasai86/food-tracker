import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "../../components/Header";
import FoodList from "components/FoodList";
import Pagination from "components/Pagination";
import { useState } from "react";
import foodData from "../../data/data.json"
import Auth from "../../components/Auth";


import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [pageNumber, setPageNumber] = useState(1)
  console.log("page no", pageNumber);
  // usets
  
  return (
    <>
   <Head>
    <title>Food App</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
  </Head>
      <main className="">
        <Header   />
        <div style={{ width: "70%", margin: "auto" }}>
          <FoodList pageNumber={pageNumber} foodData={foodData} />
          <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
        hello world!
        {/* <Auth /> */}
      </main>
    </>
  );
}
