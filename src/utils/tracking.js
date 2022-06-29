const omniture = require('./tracker/omniture.es'); // this looks funny, but it enables aliasing this require path
//const omnitureInstance = tracker.getLegacyOmnitureInstance();
//const omnitureDebug = require('./omnitureDebug.es')(omnitureInstance);

const merge = require('deepmerge');

let omnitureInstance = omniture;

if (typeof window !== 'undefined') {
  // For backwards-compatibility with global Omniture 's' variable
  if (window.s && window.s.constructor && window.s.constructor.name == 'AppMeasurement') {
    omnitureInstance = window.s;
  }
}

const browserTracker = {
  getLegacyOmnitureInstance: function () {
    return omnitureInstance;
  },

  set: function (data = {}) {
    Object.assign(omnitureInstance, data);
  },

  trackLink: function (linkName, data = {}, linkType = 'o') {
    // TODO: move these legacy tracking requirements to a 'legacy' wrapper module
    console.log(data.pageName);
    console.log(omnitureInstance.pageName);
    const legacyLinkName = (data.pageName || omnitureInstance.pageName) + '|' + linkName;
    const legacyData = merge(data, {
      contextData: { 'hg.SitePathing': legacyLinkName }
    });

    this._track(() => omnitureInstance.trackLink(true, linkType, legacyLinkName), legacyData);
  },

  trackPage: function (data) {
    this._track(omnitureInstance.track, data);
  },

  _track: function (trackFunction, data = {}) {
    /* Preserve previous state to restore after tracking */
    const previousState = {};
    previousState.contextData = omnitureInstance.contextData;
    Object.keys(omnitureInstance).forEach((key) => {
      if (typeof omnitureInstance[key] === 'string') {
        previousState[key] = omnitureInstance[key];
      }
    });

    /* Set data for current tracking event */
    Object.assign(omnitureInstance, merge(previousState, data)); // deep-merge event data
    omnitureInstance.linkTrackVars = null; // set this to 'null' so we track all contextData attributes

    /* Trigger tracking event */
    trackFunction();

    /* Restore previous data state */
    Object.keys(data).forEach((key) => delete omnitureInstance[key]); // remove event data attributes
    Object.assign(omnitureInstance, previousState); // restore previous state
  }
};

const serverTracker = {
  getLegacyOmnitureInstance: function () {
    return {};
  },
  set: function () {},
  trackLink: function () {},
  trackPage: function () {}
};

export const tracker = typeof window === 'undefined' ? serverTracker : browserTracker;

/*
 * Polyfill for Element.closest() — not supported in IE11
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
export const polyfillForClosest = () => {
  if (!Element.prototype.matches)
    Element.prototype.matches =
      Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

  if (!Element.prototype.closest)
    Element.prototype.closest = function (s) {
      let el = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
};

export const onClickTrack = (e) => {
  let target = e.target.closest('.hg-track');
  if (!target) return;
  let linkName = target.getAttribute('data-hgoname') || '';
  let linkVarValues = target.getAttribute('data-linkvars') || '';
  let trackValues = {};
  if (linkVarValues) {
    let linkVarPairs = linkVarValues.split('~');
    for (let i = 0; i < linkVarPairs.length; i++) {
      let nameValue = linkVarPairs[i].split('=');
      if (nameValue.length === 2) {
        trackValues[nameValue[0]] = nameValue[1];
      }
    }
  }
  HG3Tracker.OmnitureTrackLink(linkName, trackValues);
};

let filterCounter = 0;

export const HG3Tracker = {
  InitBindings: function () {
    polyfillForClosest();
    document.addEventListener('click', onClickTrack);
  },
  SetInitialPageVariables: function (contextData, pageName, server, linkTrackVars) {
    tracker.set({
      contextData,
      pageName,
      server,
      linkTrackVars
    });
  },
  TrackPage: function (data) {
    tracker.trackPage(data);
  },
  OmnitureTrackLink: function (linkName, contextData = {}) {
    const trackingValues = { contextData };

    // This conditional is specific to provider and hospital pages — it would be better to implement this on those pages instead of here
    // if (
    //   omnitureInstance.pageName === 'profile: provider' ||
    //   omnitureInstance.pageName === 'profile: hospital'
    // ) {
    //   trackingValues.pageName = `${omnitureInstance.pageName}: about`;
    // }

    tracker.trackLink(linkName, trackingValues);
    //omnitureDebug.recordOmnitureCall('trackLink');
  },
  OmnitureTrackPage: function (trackingData) {
    const contextData = trackingData.trackingValues || {};
    contextData['hg.Channel'] = trackingData.channel;
    contextData['hg.SitePathing'] = trackingData.pageName;
    contextData['hg.ExceptionTracking'] = trackingData.pageName;

    // make sure hg.ClickToCallNumber is not included on pageview or later click on the page - workitem 143838
    // (Whatever adds the 'ClickToCallNumber' attribute should be fixed to use omniture-tracker, which doesn't persist temporary tracking values)
    // if (omnitureInstance.contextData['hg.ClickToCallNumber']) {
    //   contextData['hg.ClickToCallNumber'] = undefined;
    //   console.warn(
    //     '"hg.ClickToCallNumber" should not be permanently set on the global Omniture object.  Instead, pass it as a temporary attribute in the trackLink() or trackPage() function.'
    //   );
    // }

    if (trackingData.resetValues) {
      delete trackingData.resetValues;
      console.warn(
        'The "resetValues" setting is no longer supported by OmnitureTrackPage().  Previous values will always be restored after page load event.'
      );
    }

    if (trackingData.includeDataList) {
      delete trackingData.includeDataList;
      console.warn(
        'The "includeDataList" setting is no longer supported by OmnitureTrackPage().  All tracking attributes will be tracked for every event.  If necessary, specific attributes can be excluded by setting their values to undefined.'
      );
    }

    tracker.trackPage(trackingData);
    //omnitureDebug.recordOmnitureCall('pageTrack');
  },
  OmnitureTrackFilter: function (filterName, isActive, filterValue) {
    filterCounter++;
    const contextData = {
      'hg.FilterResult': '1',
      'hg.FilterTypeValue':
        filterName.toLowerCase() +
        ':' +
        (isActive ? 'uncheck' : 'check') +
        ':' +
        filterCounter +
        (filterValue ? ':' + filterValue : '')
    };

    tracker.trackLink('filter', { contextData });
  },
  OmnitureTrackSort: function (sortName) {
    sortName = (sortName || '').toLowerCase();
    tracker.trackLink('sorting-' + sortName);
  },
  OmnitureResetPageName: function (pageName) {
    tracker.set({ pageName });
  }
};
