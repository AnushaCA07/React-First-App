import React, { Fragment } from 'react';
import './_footer.less';
import '@hg/joy/src/globalstyles';
import PropTypes from 'prop-types';

//media imports
import footerLogo from '../../../assets/images/healthgrades_logo.svg';

const Footer = (props) => {
  return (
    <div className='footer-main'>
      <div className='footer'>
        <div>
          <img src={footerLogo} alt='Healthgrades' />
        </div>
        <div>
          <p className='links'>
            <a
              href='https://www.healthgrades.com/'
              target='_blank'
              rel='noreferrer'
              className='hyper-link'>
              Healthgrades.com
            </a>
            <a
              href='https://www.healthgrades.com/about'
              target='_blank'
              rel='noreferrer'
              className='hyper-link'>
              About Us
            </a>
            <a
              href='https://www.healthgrades.com/help-start'
              target='_blank'
              rel='noreferrer'
              className='hyper-link'>
              Contact Us
            </a>
            <a
              href='https://www.healthgrades.com/content/legal-disclaimer'
              target='_blank'
              rel='noreferrer'
              className='hyper-link'>
              Legal Disclaimer
            </a>
            <a
              href='https://www.healthgrades.com/content/privacy-policy'
              target='_blank'
              rel='noreferrer'
              className='hyper-link'>
              Privacy Policy
            </a>
            <a
              href='https://helpcenter.healthgrades.com/help?utm_source=hgmd&utm_medium=footer&utm_campaign=help-center'
              target='_blank'
              rel='noreferrer'
              className='hyper-link no-seperator'>
              Help Center
            </a>
          </p>
          <p className='copyright'>
            © Copyright {new Date().getFullYear()} Healthgrades Marketplace, LLC, a Red Ventures
            Company, Patent US 7,752,060 and 8,719,052. All Rights Reserved. Third Party materials
            included herein protected under copyright law.
          </p>
          <p>
            <i>
              {' '}
              Use of this website and any information contained herein is governed by the{' '}
              <a
                href='https://update.healthgrades.com/user-agreement'
                target='_blank'
                rel='noreferrer'
                className='link no-seperator'>
                Healthgrades Physician User Agreement
              </a>{' '}
              Misrepresenting yourself as a physician violates federal statutes and laws in all 50
              states. Only physicians or their authorized representatives are allowed to manage the
              physician's profile on Healthgrades. Violators will be prosecuted to the fullest
              extent of the law.
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  footer: PropTypes.object
};
export default Footer;
