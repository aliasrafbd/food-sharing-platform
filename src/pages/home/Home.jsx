import React from 'react';
import Slider from '../../components/Slider';
import FeaturedFoods from '../../components/FeaturedFoods';
import { useLoaderData } from 'react-router-dom';
import AboutUs from '../../components/AboutUs';
import OurBlogs from '../../components/OurBlogs';


const Home = () => {


    const {featuredFoods} = useLoaderData();

    const {ourAllBlogs} = useLoaderData();

    const awardsWon = 20;
    const servedPeopleInTotal = 130550;
    const servedFamily = Math.ceil(servedPeopleInTotal/4);
    const totalDivision = 6;
    const totalDistrict = 55;
    const totalUnion = 4110;
    const totalVillage = 12000;
    
    const servedInTotal = {awardsWon, servedPeopleInTotal, servedFamily, totalDivision, totalDistrict, totalUnion, totalVillage}

    
    return (
        <div className='max-w-7xl mx-auto'>
            <Slider></Slider>
            <FeaturedFoods featuredFoods={featuredFoods}></FeaturedFoods>
            <AboutUs servedInTotal={servedInTotal}></AboutUs>
            <OurBlogs ourAllBlogs={ourAllBlogs}></OurBlogs>
        </div>
    );
};

export default Home;