import React from 'react';
import './Carousel.scss';
import 'antd/dist/antd.css';

import {Carousel} from 'antd';

export default function MyCarousel(){
    return(
        <Carousel className="my-carousel" autoplay>
            <div>
                <img src="https://www.cityofgp.com/sites/default/files/styles/inner_banner/public/uploads/banners/animals-pets-banner.jpg?itok=5lIml3cX" alt=""/>
            </div>
            <div>
                <img src="http://www.radiopetlady.com/wp-content/uploads/bfi_thumb/RPLN-Multi-Dog-and-cats-2-1920x731-6s69on2zlvwrb6dw71qibv1vbb06omlwrh8zuzntxgs.jpg" alt="" />
            </div>
            <div>
                <img src="https://www.petprotect.co.uk/wp-content/uploads/2019/10/xl-home-new-pricing_1-2.jpg" alt="" />
            </div>
            <div>
                <img src="https://www.petsit.com/stuff/contentmgr/files/0/b54b67c8fc3178e47a4564632904324d/image/as_woman_dog_site_hero_image_1170.jpg" alt="" />
            </div>
        </Carousel>
    );
};