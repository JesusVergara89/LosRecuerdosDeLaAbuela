import React, { useState } from 'react';
import '../styles/Home.css';
import Allproducts from './Allproducts';
import Footer from './Footer';

const Home = () => {
  const totalItems = 3;
  let touchStartX = 0;
  let pointers = [1, 2, 3]

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;
    const threshold = 30;
    if (delta > threshold) {
      handlePrev();
    } else if (delta < -threshold) {
      handleNext();
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  let idProduct = null;

  return (
    <div className="home">
      <div className="home-images" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="home-images-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          <div className="home-images-item" >
            <img src="https://raw.githubusercontent.com/JesusVergara89/ImagesWeb/main/plato_decorativo.png" alt="" />
          </div>       
          <div className="home-images-item" >
            <img src="https://raw.githubusercontent.com/JesusVergara89/ImagesWeb/main/muneca-nwe.jpg" alt="" />
          </div>
          <div className="home-images-item" >
            <img src="https://raw.githubusercontent.com/JesusVergara89/ImagesWeb/main/another_plate.webp" alt="" />
          </div>
        </div>
        <button className="prev-button" onClick={handlePrev}> <i className='bx bxs-left-arrow' ></i> </button>
        <button className="next-button" onClick={handleNext}> <i className='bx bxs-right-arrow'></i> </button>
      </div>
      <div className="home-pointers">
        {pointers.map((dot, i, array) => (
          <i key={i} onClick={() => goToSlide(i)} className={currentIndex === array.indexOf(dot) ? 'bx bxs-circle big' : 'bx bxs-circle'}></i>
        ))}
      </div>
      <Allproducts idProduct={idProduct} />

      <Footer />
    </div>
  );
};

export default Home;
