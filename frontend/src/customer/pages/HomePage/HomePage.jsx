import React from 'react';
import useModelData from '../../../hooks/useModelData';
import Hero from '../../components/Hero/Hero';
import Shoepee from '../../components/KeenSlider/Shoepee';
import Stacked from '../../components/Stacked/Stacked';
import Stacked2 from '../../components/Stacked/Stacked2';
import StepCustomize from '../../components/Steps/stepsCustomize';

const HomePage = () => {
  const { modelList } = useModelData();

  return (
    <>
      <Hero />

      {modelList.length > 0 && <Stacked2 modelList={modelList} />}
      {modelList.length > 0 && <Stacked modelList2={modelList} />}
      <StepCustomize />
      <Shoepee />
    </>
  );
};
export default HomePage;
