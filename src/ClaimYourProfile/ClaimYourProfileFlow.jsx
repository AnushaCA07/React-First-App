import React from 'react';

//stylesheet imports
import './_claimYourProfileFlow.less';

//media imports
import svgOne from '../../assets/images/ClaimYourProfile/icon-one.svg';
import svgTwo from '../../assets/images/ClaimYourProfile/icon-two.svg';
import svgThree from '../../assets/images/ClaimYourProfile/icon-three.svg';
import svgSeparator from '../../assets/images/ClaimYourProfile/separator.svg';

const ClaimYourProfileFlow = () => {
  const formatPartToBold = (str, strToChange) => {
    return str.replace(strToChange, `<strong>${strToChange}</strong>`);
  };

  return (
    <>
      <div className='workflow'>
        <img src={svgOne} alt='one' />
        <span
          className='workflow-content'
          dangerouslySetInnerHTML={{
            __html: formatPartToBold('Register or find yourself on Healthgrades.com', 'Register')
          }}
        />
        <img className='separator' src={svgSeparator} alt='separator' />
      </div>
      <div className='workflow'>
        <img src={svgTwo} alt='two' />
        <span
          className='workflow-content'
          dangerouslySetInnerHTML={{
            __html: formatPartToBold('Add & confirm your profile information.', 'Add & confirm')
          }}
        />
        <img className='separator' src={svgSeparator} alt='separator' />
      </div>
      <div className='workflow'>
        <img src={svgThree} alt='three' />
        <span
          className='workflow-content'
          dangerouslySetInnerHTML={{
            __html: formatPartToBold('Help us verify your details.', 'verify')
          }}
        />
      </div>
    </>
  );
};

export default ClaimYourProfileFlow;
