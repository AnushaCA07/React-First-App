import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './_clientPortalDashboard.less';
import '@hg/joy/src/globalstyles';
import PropTypes from 'prop-types';
import Banner from '../Banner/Banner';
import Providers from '../RosterViewProviderList/Providers';
import Designation from '../BatchEdit/DesignationManagement/Designation';

const ClientPortalDashboard = (props) => {
  const [currentSponsorType, setCurrentSponsorType] = useState('ALL');
  const [sponsorInformation, setSponsorInformation] = useState({});
  const { accountInfo } = useSelector((state) => state.getAccountDetailsReducer);
  const [batchEdit, setbatchEdit] = useState(false);
  const [batchEditOption, setBatchEditOption] = useState('');
  const [selectedArray, setSelectedArray] = useState([]);
  const providerDisplayName = accountInfo.firstName + ' ' + accountInfo.lastName;
  const [providers, setProviders] = useState({});
  const [reload, setReload] = useState(false);

  const sponsorTypeHandler = (sponsorType) => {
    setCurrentSponsorType(sponsorType);
  };

  const sponsorInformationHandler = (sponsorInformation) => {
    setSponsorInformation(sponsorInformation);
  };
  const providersHandler = (providers) => {
    setProviders(providers);
  };
  const [reloadBanner, setReloadBanner] = useState(false);

  const loadBanner = (e) => {
    if (e == true) setReloadBanner(true);
    else setReloadBanner(false);
    setTimeout(() => {
      setReloadBanner(false);
    }, 1000);
  };

  const batchEditOptionHandler = (type, selectedProviders) => {
    if ((type != null || type != undefined) && type == 'designation') {
      setSelectedArray(selectedProviders);
      setBatchEditOption(type);
      setbatchEdit(true);
    } else {
      let pwids = Object.keys(selectedProviders).join(',');
      let form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('action', '/batch');

      let hiddenFieldEditType = document.createElement('input');
      hiddenFieldEditType.setAttribute('type', 'hidden');
      hiddenFieldEditType.setAttribute('name', 'BatchEditType');
      hiddenFieldEditType.setAttribute('value', type.toLocaleLowerCase());
      form.appendChild(hiddenFieldEditType);

      let hiddenFieldPwids = document.createElement('input');
      hiddenFieldPwids.setAttribute('type', 'hidden');
      hiddenFieldPwids.setAttribute('name', 'Pwids');
      hiddenFieldPwids.setAttribute('value', pwids);
      form.appendChild(hiddenFieldPwids);

      let hiddenFieldUserId = document.createElement('input');
      hiddenFieldUserId.setAttribute('type', 'hidden');
      hiddenFieldUserId.setAttribute('name', 'UserId');
      hiddenFieldUserId.setAttribute('value', accountInfo.userId);
      form.appendChild(hiddenFieldUserId);

      document.body.appendChild(form);
      form.submit();
    }
  };

  const reloadList = (reloaded) => {
    setReload(reloaded);
  };

  useEffect(() => {
    // batchEditOptionHandler('designation',Object.keys(selectedArray));
    setReload(reload);
  }, [reload]);

  return (
    <Fragment>
      <Banner
        providerDisplayName={providerDisplayName}
        clientCode={accountInfo.clientCode}
        userId={accountInfo.userId}
        sponsorTypeHandler={sponsorTypeHandler}
        sponsorInformationHandler={sponsorInformationHandler}
        isReloadBanner={reloadBanner}
        batchEdit={batchEdit}
      />
      {!batchEdit ? (
        <Providers
          accountInfo={accountInfo}
          currentSponsorType={currentSponsorType}
          sponsorInformation={sponsorInformation}
          reloadBanner={(e) => loadBanner(e)}
          batchEditOptionHandler={batchEditOptionHandler}
          selectedArrayHandler={setSelectedArray}
          providersHandler={providersHandler}
        />
      ) : (
        batchEditOption === 'designation' && (
          <Designation
            providerDisplayName={providerDisplayName}
            selectedProviders={selectedArray}
            providersFound={Object.keys(selectedArray).length}
            accountInfo={accountInfo}
            providersInfo={providers}
            reloadList={reloadList}
          />
        )
      )}
    </Fragment>
  );
};

ClientPortalDashboard.propTypes = {
  providerDisplayName: PropTypes.string,
  profileOverviewPeriod: PropTypes.string,
  providers: PropTypes.arrayOf(PropTypes.object),
  providersFound: PropTypes.number,
  profileInfo: PropTypes.object
};

export default ClientPortalDashboard;
