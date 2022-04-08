import React from "react";
import { useSelector } from "react-redux";

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import selectBanners from "../../redux/banner/banner.selectors";
import CarouselItem from "../carousel-item/carousel-item.component";

const OfferCarousel = ()=> {
       const offers = useSelector(selectBanners);
       console.log(offers)
        return (
            <Carousel autoPlay renderThumbs={() => null}>
                {
                offers.map(({id,...otherProps}) => (<CarouselItem key={id} {...otherProps}/>))
               }
            </Carousel>
        );
}

export default OfferCarousel