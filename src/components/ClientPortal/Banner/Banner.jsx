import React, { Fragment, useState, useEffect } from 'react';
import './_banner.less';
import PropTypes from 'prop-types';
import Medal from '../../../assets/images/premium-medal.svg';
import Total from '../../../assets/images/total-providers.svg';
import Premium from '../../../assets/images/premium.svg';
import Enhanced from '../../../assets/images/enhanced.svg';
import Standard from '../../../assets/images/standard.svg';
import logo from '../../../assets/images/Logo-demo.png';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const Banner = (props) => {
  const {
    providerDisplayName,
    clientCode,
    userId,
    sponsorTypeHandler,
    sponsorInformationHandler,
    isReloadBanner,
    batchEdit
  } = props;
  const [scrolled, setScrolled] = useState(false);
  const [empFilter, setEmpFilter] = useState(false);
  const [affFilter, setAffFilter] = useState(false);
  const [preFilter, setPreFilter] = useState(false);
  const [enhFilter, setEnhFilter] = useState(false);
  const [stdFilter, setStdFilter] = useState(false);

  const [refreshBanner, setRefreshBanner] = useState(false);

  const dispatch = useDispatch();
  const { sponsorInformation, sponsoredProvidersCount } = useSelector(
    (state) => state.getClientPortalBannerDataReducer
  );
  let headerClasses = ['fixed-header'];
  let highlightSecClasses = ['highlight-section-inner'];

  if (scrolled) {
    headerClasses.push('scrolled-header');
    highlightSecClasses.push('bottom-border-radius');
  }

  const handleScroll = () => {
    setTimeout(() => {
      const offset = window.scrollY;
      if (offset >= 210) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }, 5);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    var payload = {
      userId: userId,
      clientCode: clientCode
    };
    loadBannerData(payload);
  }, []);

  const loadBannerData = (payload) => {
    dispatch(actions.getClientPortalBannerData(payload));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const sponsorTypeChangeHandler = (sponsorType) => {
    sponsorTypeHandler(sponsorType);
    window.scrollTo(0, 370);
  };

  useEffect(() => {
    sponsorInformationHandler(sponsorInformation);
  }, [sponsorInformation]);

  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  useEffect(() => {
    setRefreshBanner(isReloadBanner);
  }, [isReloadBanner]);

  useEffect(() => {
    setRefreshBanner(false);
  }, [sponsoredProvidersCount]);

  useEffect(() => {
    if (refreshBanner) {
      var payload = {
        userId: userId,
        clientCode: clientCode
      };
      loadBannerData(payload);
    }
  }, [refreshBanner]);

  return (
    <Fragment>
      <div className='rosterviewbanner-container'>
        <div className='rosterviewbanner-inner-container'>
          <div className='banner-section'>
            <div className='top-sec'>
              <h1 className='heading'>{providerDisplayName}</h1>
              <img className='right-align-logo' src={logo} alt='Logo' />
            </div>
            <div className='sub-sec'>
              <div className='subheading-profile-type'>
                <span>
                  <img src={Medal} alt='rating' className='premium-medal' />
                  Premium Profile
                </span>
              </div>
              <p className={`para`}>
                Healthgrades is a digital extension of the affiliated
                {sponsorInformation.isFacility ? ' hospital' : ' practice'}'s physician and provider
                referral program. It makes the practice more discoverable and accessible to
                potential new patients, and includes
                <i> Featured Placement, Competitive Intercept, and a Distinctive Profile </i> on
                {isReadMore ? (
                  <span>
                    <a
                      href='https://www.healthgrades.com/'
                      alt='healthgrades.com'
                      target='_blank'
                      rel='noopener noreferrer'>
                      {' '}
                      Healthgrades
                    </a>
                    .
                    <br />
                    <p></p>
                    The phone number showing on this
                    <a
                      href='https://www.healthgrades.com/'
                      alt='healthgrades.com'
                      target='_blank'
                      rel='noopener noreferrer'>
                      {' '}
                      Healthgrades{' '}
                    </a>
                    profile is part of the Healthgrades partner program and is used for tracking
                    purposes. The calls will continue to go to the saved number for this profile.
                  </span>
                ) : null}
                <span onClick={toggleReadMore} className='read-or-hide'>
                  {`${isReadMore ? ' Show less' : '...Read more'}`}
                </span>
              </p>
            </div>
          </div>
          {!batchEdit && sponsoredProvidersCount.total > 0 && (
            <div className={headerClasses.join(' ')}>
              <div className={`highlight-section ${isReadMore && 'read-more'}`}>
                <div className={highlightSecClasses.join(' ')}>
                  <div
                    className={`cols ${sponsoredProvidersCount.total === 0 && 'disabled-cols'}`}
                    onClick={(e) => {
                      sponsoredProvidersCount.total > 0 && sponsorTypeChangeHandler('ALL');
                      setEmpFilter(false);
                      setAffFilter(false);
                      setPreFilter(false);
                      setEnhFilter(false);
                      setStdFilter(false);
                    }}>
                    <img src={Total} alt='profile' className='icons' />
                    <span className='count right-border'>{sponsoredProvidersCount.total}</span>
                    <p className='heading'>Total Providers</p>
                  </div>
                  {sponsorInformation.isFacility && sponsorInformation.sponsorType== 'PDCHSP' ? (
                    <>
                      <div
                        className={`cols ${
                          sponsoredProvidersCount.employed === 0 && 'disabled-cols'
                        }`}
                        onClick={(e) => {
                          sponsoredProvidersCount.employed > 0 &&
                            sponsorTypeChangeHandler('Employed');
                          setEmpFilter(true);
                          setAffFilter(false);
                          setStdFilter(false);
                        }}>
                        <img src={Premium} alt='rating' className='icons' />
                        <span
                          className={`count right-border ${
                            empFilter ? 'column-active-employed' : ''
                          }`}>
                          {sponsoredProvidersCount.employed}
                        </span>
                        <p className={`heading ${empFilter ? 'column-active-employed' : ''}`}>
                          Employed
                        </p>
                      </div>
                      <div
                        className={`cols ${
                          sponsoredProvidersCount.affiliated === 0 && 'disabled-cols'
                        }`}
                        onClick={(e) => {
                          sponsoredProvidersCount.affiliated > 0 &&
                            sponsorTypeChangeHandler('Affiliated');
                          setAffFilter(true);
                          setEmpFilter(false);
                          setStdFilter(false);
                        }}>
                        <img src={Enhanced} alt='Award' className='icons' />
                        <span
                          className={`count right-border ${
                            affFilter ? 'column-active-affiliated' : ''
                          }`}>
                          {sponsoredProvidersCount.affiliated}
                        </span>
                        <p className={`heading ${affFilter ? 'column-active-affiliated' : ''}`}>
                          Affiliated
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {(sponsorInformation.sponsorType == 'PDCPRAC' ||
                        sponsorInformation.sponsorType == 'MAP') && (
                        <div
                          className={`cols ${
                            sponsoredProvidersCount.premium === 0 && 'disabled-cols'
                          }`}
                          onClick={(e) => {
                            sponsoredProvidersCount.premium > 0 &&
                              sponsorTypeChangeHandler('Premium');
                            setPreFilter(true);
                            setEnhFilter(false);
                            setStdFilter(false);
                          }}>
                          <img src={Premium} alt='rating' className='icons' />
                          <span
                            className={`count right-border ${
                              preFilter ? 'column-active-premium' : ''
                            }`}>
                            {sponsoredProvidersCount.premium}
                          </span>
                          <p className={`heading ${preFilter ? 'column-active-premium' : ''}`}>
                            Premium
                          </p>
                        </div>
                      )}
                      {sponsorInformation.sponsorType == 'PDCPRACT2' && (
                        <div
                          className={`cols ${
                            sponsoredProvidersCount.enhanced === 0 && 'disabled-cols'
                          }`}
                          onClick={(e) => {
                            sponsoredProvidersCount.enhanced > 0 &&
                              sponsorTypeChangeHandler('Enhanced');
                            setEnhFilter(true);
                            setPreFilter(false);
                            setStdFilter(false);
                          }}>
                          <img src={Enhanced} alt='Award' className='icons' />
                          <span
                            className={`count right-border ${
                              enhFilter ? 'column-active-enhanced' : ''
                            }`}>
                            {sponsoredProvidersCount.enhanced}
                          </span>
                          <p className={`heading ${enhFilter ? 'column-active-enhanced' : ''}`}>
                            Enhanced
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  <div
                    className={`cols standard-last ${
                      sponsoredProvidersCount.standard === 0 && 'disabled-cols'
                    }`}
                    onClick={(e) => {
                      sponsoredProvidersCount.standard > 0 && sponsorTypeChangeHandler('Standard');
                      setStdFilter(true);
                      setEmpFilter(false);
                      setAffFilter(false);
                      setPreFilter(false);
                      setEnhFilter(false);
                    }}>
                    <img src={Standard} alt='rating' className='icons' />
                    <span className={`count ${stdFilter ? 'column-active-standard' : ''}`}>
                      {sponsoredProvidersCount.standard}
                    </span>
                    <p className={`heading ${stdFilter ? 'column-active-standard' : ''}`}>
                      Standard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <svg
            className={`rosterviewbanner-background-svg ${batchEdit && isReadMore ? 'add-margin' : ' '}`}
            data-qa-target='rosterviewbanner-background-svg'
            preserveAspectRatio='none'
            viewBox='0 0 1442 149'>
            <path
              d='M0 149H1442C1294.8 56 922.421 -33.1384 616.576 36.3702C310.73 105.879 78.0896 49.1638 0 0V149Z'
              fill='white'></path>
          </svg>

          <svg
            className='rosterviewbanner-background-svg-mobile'
            data-qa-target='rosterviewbanner-background-svg-mobile'
            preserveAspectRatio='none'
            viewBox='0 0 375 120'>
            <path
              d='M0.0958797 7.28809C31.3141 43.007 103.471 68.0182 187.5 68.0182C271.528 68.0182 343.685 43.007 374.903 7.28809H375V139.313H0V7.28809H0.0958797Z'
              fill='#FFFFFF'></path>
          </svg>
        </div>
      </div>
    </Fragment>
  );
};

Banner.propTypes = {
  providerDisplayName: PropTypes.string,
  profileOverviewPeriod: PropTypes.string,
  sponsorTypeHandler: PropTypes.func,
  sponsorInformationHandler: PropTypes.func,
  isReloadBanner: PropTypes.bool,
  batchEdit: PropTypes.bool
};

export default Banner;
