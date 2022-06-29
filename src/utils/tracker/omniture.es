/* Version 1.3.1 */

/* Last Updated: 2014-6-9 */

/* 'virtualWindow' replaces 'window' to encapsulate omniture functionality in a module
 * (instead of having the global window.s object)
 */
let s = {},
  virtualWindow = {};
if (typeof window !== 'undefined') {
  virtualWindow = {
    location: window.location,
    document: window.document,
  };

  s = new AppMeasurement();
  setConfigs(s);
}

module.exports = s;

function setConfigs(s) {
  /************************** CONFIG SECTION **************************/
  /* You may add or alter any code config here. */
  s.currencyCode = 'USD';
  s.trackDownloadLinks = true;
  s.trackExternalLinks = true;
  s.trackInlineStats = true;
  s.linkDownloadFileTypes =
    'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
  s.linkInternalFilters =
    window.location.hostname +
    ',javascript:,healthgrades.com,physicianreports.com,wrongdiagnosis.com,qualtrics.com,tel:,sms:';
  s.linkLeaveQueryString = false;
  s.linkTrackVars = '';
  s.linkTrackEvents = 'None';

  /*START AND END DAYLIGHT SAVINGS TIME DATES*/
  //time parting configuration
  //US

  s._tpDST = {
    2012: '3/11,11/4',
    2013: '3/10,11/3',
    2014: '3/9,11/2',
    2015: '3/8,11/1',
    2016: '3/13,11/6',
    2017: '3/12,11/5',
    2018: '3/11,11/4',
    2019: '3/10,11/3',
    2020: '4/5,10/4',
    2021: '4/4,10/3',
  };

  /* Plugin Config */

  /* Page Name Plugin Config */
  /* Will get page name from URL */
  s.siteID = ''; // leftmost value in pagename
  s.defaultPage = ''; // filename to add when none exists
  s.queryVarsList = ''; // query parameters to keep
  s.pathExcludeDelim = ';'; // portion of the path to exclude
  s.pathConcatDelim = ''; // page name component separator
  s.pathExcludeList = ''; // elements to exclude from the path
  s.usePlugins = true; // plugin config
}

/* DoPlugins */
s.doPlugins = function (s) {
  /* New vs. Repeat */
  s.contextData['hg.NewRepeatVisits'] = s.getNewRepeat();

  /* Set Time Parting Variables */
  var timePart = s.getTimeParting('n', '-7');
  var timePartArray = timePart.split('|');
  s.contextData['hg.HourOfDay'] = timePartArray[0]; // Set hour
  if (timePartArray.length > 1) {
    s.contextData['hg.DayOfWeek'] = timePartArray[1]; // Set day
    var dayType = 'Weekday';
    if (
      s.contextData['hg.DayOfWeek'].indexOf('Saturday') > 0 ||
      s.contextData['hg.DayOfWeek'].indexOf('Sunday') > 0
    )
      dayType = 'Weekend';
    s.contextData['hg.WeekdayWeekend'] = dayType; // Set Weekend / Weekday
  }

  s.contextData['hg.DaysSinceLastVisit'] =
    s.getDaysSinceLastVisit('s_lastvisit');
  s.contextData['hg.DaysSinceFirstVisit'] =
    s.getDaysSinceFirstVisit('s_firstvisit');

  if (!s.contextData['hg.SitePathing']) {
    s.contextData['hg.SitePathing'] = s.pageName;
  }
  if (!s.contextData['hg.ExceptionTracking']) {
    s.contextData['hg.ExceptionTracking'] = s.pageName;
  }

  /* External Campaign Tracking */
  if (!s.campaign) {
    //check for cid and did camgaing codes, if both exist go with did
    var campaignCid = s.Util.getQueryParam('cid');
    var campaignDid = s.Util.getQueryParam('did');
    s.campaign = campaignDid ? campaignDid : campaignCid;
  }
  s.campaign = s.getValOnce(s.campaign, 's_campaign', 0);

  /* Screen Layout Tracking */
  var getOrientation = function () {
    if (window.innerHeight > window.innerWidth) {
      var orientation = 'portrait';
    } else if (window.innerHeight < window.innerWidth) {
      var orientation = 'landscape';
    } else {
      var orientation = 'NA';
    }
    return orientation;
  };

  var getBreakpoint = function () {
    if (window.innerWidth < 639) {
      var breakpoint = '1 column';
    } else if (window.innerWidth > 959) {
      var breakpoint = '3 column';
    } else {
      var breakpoint = '2 column';
    }
    return breakpoint;
  };

  s.contextData['hg.orientation'] = getOrientation();
  s.contextData['hg.breakpoint'] = getBreakpoint();

  //T&T & SiteCatylst integration
  s.tnt = s.trackTNT();
};

/************************** PLUGINS SECTION *************************/
/*
 * Utility manageVars v1.4 - clear variable values (requires split 1.5)
 */
s.manageVars = new Function(
  'c',
  'l',
  'f',
  '' +
    "var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa" +
    'geName,purchaseID,channel,server,pageType,campaign,state,zip,events' +
    ",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar" +
    "'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl" +
    "it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l" +
    "a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}" +
    "}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0" +
    ');return true;}else{return false;}'
);
s.clearVars = new Function('t', "var s=this;s[t]='';");
s.lowercaseVars = new Function(
  't',
  '' +
    "var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index" +
    "Of('D=')!=0){s[t]=s[t].toLowerCase();}}"
);

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split = new Function(
  'l',
  'd',
  '' +
    'var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x' +
    '++]=l.substring(0,i);l=l.substring(i+d.length);}return a'
);

/*
 * Plugin: linkHandler 0.7 - identify and report custom links
 */
s.linkHandler = new Function(
  'p',
  't',
  'o',
  '' +
    "var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN" +
    "ame)))return'';i=h.href.indexOf('?');h.href=s.linkLeaveQueryString|" +
    "|i<0?h.href:h.href.substring(0,i);l=s.pt(p,'|','p_gn',h.href.toLowe" +
    "rCase());if(l){s.linkName=l=='[['?'':l;s.linkType=t;return o?h:h.hr" +
    "ef;}return'';"
);
s.p_gh = new Function(
  '',
  '' +
    "var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o" +
    "),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o" +
    "=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot" +
    "(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';"
);
s.p_gn = new Function(
  't',
  'h',
  '' +
    "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x=" +
    "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}" +
    'return 0;'
);

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat = new Function(
  'd',
  'cn',
  '' +
    'var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:' +
    "'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length=" +
    "=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct" +
    "-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N" +
    "ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}"
);

/*
 * Plugin: getTimeParting 3.4
 */
s.getTimeParting = new Function(
  'h',
  'z',
  '' +
    "var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont" +
    "h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['" +
    "Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda" +
    "y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp" +
    "DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea" +
    "r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)" +
    "{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT" +
    'imezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getHours();M=d' +
    ".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U='AM';if(H>=12){U='P" +
    "M';H=H-12;}if(H==0){H=12;}D=da[D];tm=H+':'+M+U;return(tm+'|'+D);}"
);

/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce = new Function(
  'v',
  'c',
  'e',
  '' +
    "var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c" +
    ');if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return' +
    " v==k?'':v"
);

/*
 * Plugin: Days since last Visit 1.1 - capture time from last visit
 */
s.getDaysSinceLastVisit = new Function(
  'c',
  '' +
    'var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT' +
    'ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s' +
    "etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f" +
    "2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f" +
    "5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);" +
    "s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da" +
    "y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day" +
    "){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s." +
    "c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c" +
    "_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c" +
    "+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur" +
    'n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s' +
    "!=f5) return '';else return cval_s;"
);

/*
 * Plugin: Custom - Days Since First Visit 0.1 - Capture days since first visit
 */
s.getDaysSinceFirstVisit = new Function(
  'c',
  '' +
    'var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT' +
    'ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+5*365*day);es.s' +
    "etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f" +
    "2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f" +
    "5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);" +
    "s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da" +
    "y)s.c_w(c+'_s',f2,es);else if(d<30*day+1&&d>7*day)s.c_w(c+'_s',f3,e" +
    "s);else if(d<7*day+1&&d>day)s.c_w(c+'_s',f4,es);else if(d<day+1)s.c" +
    "_w(c+'_s',f5,es);}else{cval_ss=s.c_r(c+'_s');s.c_w(c+'_s',cval_ss,e" +
    "s);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0)return f0;else if(cva" +
    "l_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s!=f5)return'';el" +
    'se return cval_s;'
);

/*
 * Plugin Utility: Replace v1.0
 */
s.repl = new Function(
  'x',
  'o',
  'n',
  '' +
    'var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x.' +
    'substring(i+o.length);i=x.indexOf(o,i+l)}return x'
);

/*
 * Plugin Utility: apl v1.1
 */
s.apl = new Function(
  'L',
  'v',
  'd',
  'u',
  '' +
    "var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a." +
    'length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas' +
    'e()));}}if(!m)L=L?L+d+v:v;return L'
);

/************************ Test&Target Plugin Start *************************/
/*
 * TNT Integration Plugin v1.0
 */
s.trackTNT = new Function(
  'v',
  'p',
  'b',
  '' +
    "var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s." +
    "getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.w[v" +
    "]!=undefined){r+=s.w[v];}if(b){s.w[v]='';}return r;"
);
/*********************** Test&Target Plugin End *************************/

/* WARNING: Changing any of the below variables will cause drastic
    changes to how your visitor data is collected.  Changes should only be
    made when instructed to do so by your account manager.*/

s.visitorNamespace = 'healthgrades';
s.trackingServer = 'om.healthgrades.com';
s.trackingServerSecure = 'som.healthgrades.com';
s.dc = 112;

/*MODULES*/

/*MODULE INTEGRATION - USED FOR DATA CONNECTORS AKA GENESIS*/

function AppMeasurement_Module_Integrate(s) {
  var m = this;
  m.s = s;
  var w = virtualWindow;
  if (!w.s_c_in) (w.s_c_il = []), (w.s_c_in = 0);
  m._il = w.s_c_il;
  m._in = w.s_c_in;
  m._il[m._in] = m;
  w.s_c_in++;
  m._c = 's_m';
  m.list = [];
  m.add = function (c, b) {
    var a;
    b || (b = 's_Integrate_' + c);
    w[b] || (w[b] = {});
    a = m[c] = w[b];
    a.a = c;
    a.e = m;
    a._c = 0;
    a._d = 0;
    a.disable == void 0 && (a.disable = 0);
    a.get = function (b, c) {
      var d = document,
        f = d.getElementsByTagName('HEAD'),
        g;
      if (
        !a.disable &&
        (c || (v = 's_' + m._in + '_Integrate_' + a.a + '_get_' + a._c),
        a._c++,
        (a.VAR = v),
        (a.CALLBACK = 's_c_il[' + m._in + '].' + a.a + '.callback'),
        a.delay(),
        (f = f && f.length > 0 ? f[0] : d.body))
      )
        try {
          g = d.createElement('SCRIPT');
          g.type = 'text/javascript';
          g.setAttribute('async', 'async');
          g.src = m.c(a, b);
          if (b.indexOf('[CALLBACK]') < 0)
            g.onload = g.onreadystatechange = function () {
              a.callback(w[v]);
            };
          f.firstChild ? f.insertBefore(g, f.firstChild) : f.appendChild(g);
        } catch (s) {}
    };
    a.callback = function (b) {
      var m;
      if (b) for (m in b) Object.prototype[m] || (a[m] = b[m]);
      a.ready();
    };
    a.beacon = function (b) {
      var c = 's_i_' + m._in + '_Integrate_' + a.a + '_' + a._c;
      if (!a.disable) a._c++, (c = w[c] = new Image()), (c.src = m.c(a, b));
    };
    a.script = function (b) {
      a.get(b, 1);
    };
    a.delay = function () {
      a._d++;
    };
    a.ready = function () {
      a._d--;
      a.disable || s.delayReady();
    };
    m.list.push(c);
  };
  m._g = function (c) {
    var b,
      a = (c ? 'use' : 'set') + 'Vars';
    for (c = 0; c < m.list.length; c++)
      if ((b = m[m.list[c]]) && !b.disable && b[a])
        try {
          b[a](s, b);
        } catch (w) {}
  };
  m._t = function () {
    m._g(1);
  };
  m._d = function () {
    var c, b;
    for (c = 0; c < m.list.length; c++)
      if ((b = m[m.list[c]]) && !b.disable && b._d > 0) return 1;
    return 0;
  };
  m.c = function (m, b) {
    var a, w, e, d;
    b.toLowerCase().substring(0, 4) != 'http' && (b = 'http://' + b);
    s.ssl && (b = s.replace(b, 'http:', 'https:'));
    m.RAND = Math.floor(Math.random() * 1e13);
    for (a = 0; a >= 0; )
      (a = b.indexOf('[', a)),
        a >= 0 &&
          ((w = b.indexOf(']', a)),
          w > a &&
            ((e = b.substring(a + 1, w)),
            e.length > 2 && e.substring(0, 2) == 's.'
              ? (d = s[e.substring(2)]) || (d = '')
              : ((d = '' + m[e]),
                d != m[e] && parseFloat(d) != m[e] && (e = 0)),
            e &&
              (b =
                b.substring(0, a) + encodeURIComponent(d) + b.substring(w + 1)),
            (a = w)));
    return b;
  };
}

/*
     ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============
    
     AppMeasurement for JavaScript version: 1.3.1
     Copyright 1996-2013 Adobe, Inc. All Rights Reserved
     More info available at http://www.omniture.com
    */
function AppMeasurement() {
  var s = this;
  s.version = '1.3.1';
  var w = virtualWindow;
  if (!w.s_c_in) (w.s_c_il = []), (w.s_c_in = 0);
  s._il = w.s_c_il;
  s._in = w.s_c_in;
  s._il[s._in] = s;
  w.s_c_in++;
  s._c = 's_c';
  var k = w.ob;
  k || (k = null);
  var j = w,
    g,
    o;
  try {
    g = j.parent;
    for (
      o = j.location;
      g &&
      g.location &&
      o &&
      '' + g.location != '' + o &&
      j.location &&
      '' + g.location != '' + j.location &&
      g.location.host == o.host;

    )
      (j = g), (g = j.parent);
  } catch (p) {}
  s.Za = function (s) {
    try {
      console.log(s);
    } catch (a) {}
  };
  s.oa = function (s) {
    return '' + parseInt(s) == '' + s;
  };
  s.replace = function (s, a, c) {
    if (!s || s.indexOf(a) < 0) return s;
    return s.split(a).join(c);
  };
  s.escape = function (b) {
    var a, c;
    if (!b) return b;
    b = encodeURIComponent(b);
    for (a = 0; a < 7; a++)
      (c = "+~!*()'".substring(a, a + 1)),
        b.indexOf(c) >= 0 &&
          (b = s.replace(
            b,
            c,
            '%' + c.charCodeAt(0).toString(16).toUpperCase()
          ));
    return b;
  };
  s.unescape = function (b) {
    if (!b) return b;
    b = b.indexOf('+') >= 0 ? s.replace(b, '+', ' ') : b;
    try {
      return decodeURIComponent(b);
    } catch (a) {}
    return unescape(b);
  };
  s.Qa = function () {
    var b = w.location.hostname,
      a = s.fpCookieDomainPeriods,
      c;
    if (!a) a = s.cookieDomainPeriods;
    if (
      b &&
      !s.ha &&
      !/^[0-9.]+$/.test(b) &&
      ((a = a ? parseInt(a) : 2),
      (a = a > 2 ? a : 2),
      (c = b.lastIndexOf('.')),
      c >= 0)
    ) {
      for (; c >= 0 && a > 1; ) (c = b.lastIndexOf('.', c - 1)), a--;
      s.ha = c > 0 ? b.substring(c) : b;
    }
    return s.ha;
  };
  s.c_r = s.cookieRead = function (b) {
    b = s.escape(b);
    var a = ' ' + s.d.cookie,
      c = a.indexOf(' ' + b + '='),
      e = c < 0 ? c : a.indexOf(';', c);
    b =
      c < 0
        ? ''
        : s.unescape(a.substring(c + 2 + b.length, e < 0 ? a.length : e));
    return b != '[[B]]' ? b : '';
  };
  s.c_w = s.cookieWrite = function (b, a, c) {
    var e = s.Qa(),
      d = s.cookieLifetime,
      f;
    a = '' + a;
    d = d ? ('' + d).toUpperCase() : '';
    c &&
      d != 'SESSION' &&
      d != 'NONE' &&
      ((f = a != '' ? parseInt(d ? d : 0) : -60)
        ? ((c = new Date()), c.setTime(c.getTime() + f * 1e3))
        : c == 1 &&
          ((c = new Date()),
          (f = c.getYear()),
          c.setYear(f + 5 + (f < 1900 ? 1900 : 0))));
    if (b && d != 'NONE')
      return (
        (s.d.cookie =
          b +
          '=' +
          s.escape(a != '' ? a : '[[B]]') +
          '; path=/;' +
          (c && d != 'SESSION' ? ' expires=' + c.toGMTString() + ';' : '') +
          (e ? ' domain=' + e + ';' : '')),
        s.cookieRead(b) == a
      );
    return 0;
  };
  s.D = [];
  s.C = function (b, a, c) {
    if (s.ia) return 0;
    if (!s.maxDelay) s.maxDelay = 250;
    var e = 0,
      d = new Date().getTime() + s.maxDelay,
      f = s.d.mb,
      i = ['webkitvisibilitychange', 'visibilitychange'];
    if (!f) f = s.d.nb;
    if (f && f == 'prerender') {
      if (!s.R) {
        s.R = 1;
        for (c = 0; c < i.length; c++)
          s.d.addEventListener(i[c], function () {
            var b = s.d.mb;
            if (!b) b = s.d.nb;
            if (b == 'visible') (s.R = 0), s.delayReady();
          });
      }
      e = 1;
      d = 0;
    } else c || (s.r('_d') && (e = 1));
    e &&
      (s.D.push({ m: b, a: a, t: d }),
      s.R || setTimeout(s.delayReady, s.maxDelay));
    return e;
  };
  s.delayReady = function () {
    var b = new Date().getTime(),
      a = 0,
      c;
    for (s.r('_d') && (a = 1); s.D.length > 0; ) {
      c = s.D.shift();
      if (a && !c.t && c.t > b) {
        s.D.unshift(c);
        setTimeout(s.delayReady, parseInt(s.maxDelay / 2));
        break;
      }
      s.ia = 1;
      s[c.m].apply(s, c.a);
      s.ia = 0;
    }
  };
  s.setAccount = s.sa = function (b) {
    var a, c;
    if (!s.C('setAccount', arguments))
      if (((s.account = b), s.allAccounts)) {
        a = s.allAccounts.concat(b.split(','));
        s.allAccounts = [];
        a.sort();
        for (c = 0; c < a.length; c++)
          (c == 0 || a[c - 1] != a[c]) && s.allAccounts.push(a[c]);
      } else s.allAccounts = b.split(',');
  };
  s.foreachVar = function (b, a) {
    var c,
      e,
      d,
      f,
      i = '';
    d = e = '';
    if (s.lightProfileID)
      (c = s.H),
        (i = s.lightTrackVars) && (i = ',' + i + ',' + s.U.join(',') + ',');
    else {
      c = s.c;
      if (s.pe || s.linkType)
        if (
          ((i = s.linkTrackVars),
          (e = s.linkTrackEvents),
          s.pe &&
            ((d = s.pe.substring(0, 1).toUpperCase() + s.pe.substring(1)),
            s[d]))
        )
          (i = s[d].lb), (e = s[d].kb);
      i && (i = ',' + i + ',' + s.A.join(',') + ',');
      e && i && (i += ',events,');
    }
    a && (a = ',' + a + ',');
    for (e = 0; e < c.length; e++)
      (d = c[e]),
        (f = s[d]) &&
          (!i || i.indexOf(',' + d + ',') >= 0) &&
          (!a || a.indexOf(',' + d + ',') >= 0) &&
          b(d, f);
  };
  s.J = function (b, a, c, e, d) {
    var f = '',
      i,
      m,
      w,
      q,
      g = 0;
    b == 'contextData' && (b = 'c');
    if (a) {
      for (i in a)
        if (
          !Object.prototype[i] &&
          (!d || i.substring(0, d.length) == d) &&
          a[i] &&
          (!c || c.indexOf(',' + (e ? e + '.' : '') + i + ',') >= 0)
        ) {
          w = !1;
          if (g)
            for (m = 0; m < g.length; m++)
              i.substring(0, g[m].length) == g[m] && (w = !0);
          if (
            !w &&
            (f == '' && (f += '&' + b + '.'),
            (m = a[i]),
            d && (i = i.substring(d.length)),
            i.length > 0)
          )
            if (((w = i.indexOf('.')), w > 0))
              (m = i.substring(0, w)),
                (w = (d ? d : '') + m + '.'),
                g || (g = []),
                g.push(w),
                (f += s.J(m, a, c, e, w));
            else if ((typeof m == 'boolean' && (m = m ? 'true' : 'false'), m)) {
              if (e == 'retrieveLightData' && d.indexOf('.contextData.') < 0)
                switch (((w = i.substring(0, 4)), (q = i.substring(4)), i)) {
                  case 'transactionID':
                    i = 'xact';
                    break;
                  case 'channel':
                    i = 'ch';
                    break;
                  case 'campaign':
                    i = 'v0';
                    break;
                  default:
                    s.oa(q) &&
                      (w == 'prop'
                        ? (i = 'c' + q)
                        : w == 'eVar'
                        ? (i = 'v' + q)
                        : w == 'list'
                        ? (i = 'l' + q)
                        : w == 'hier' &&
                          ((i = 'h' + q), (m = m.substring(0, 255))));
                }
              f += '&' + s.escape(i) + '=' + s.escape(m);
            }
        }
      f != '' && (f += '&.' + b);
    }
    return f;
  };
  s.Sa = function () {
    var b = '',
      a,
      c,
      e,
      d,
      f,
      i,
      m,
      w,
      g = '',
      k = '',
      j = (c = '');
    if (s.lightProfileID)
      (a = s.H),
        (g = s.lightTrackVars) && (g = ',' + g + ',' + s.U.join(',') + ',');
    else {
      a = s.c;
      if (s.pe || s.linkType)
        if (
          ((g = s.linkTrackVars),
          (k = s.linkTrackEvents),
          s.pe &&
            ((c = s.pe.substring(0, 1).toUpperCase() + s.pe.substring(1)),
            s[c]))
        )
          (g = s[c].lb), (k = s[c].kb);
      g && (g = ',' + g + ',' + s.A.join(',') + ',');
      k && ((k = ',' + k + ','), g && (g += ',events,'));
      s.events2 && (j += (j != '' ? ',' : '') + s.events2);
    }
    s.AudienceManagement &&
      s.AudienceManagement.isReady() &&
      (b += s.J('d', s.AudienceManagement.getEventCallConfigParams()));
    for (c = 0; c < a.length; c++) {
      d = a[c];
      f = s[d];
      e = d.substring(0, 4);
      i = d.substring(4);
      !f && d == 'events' && j && ((f = j), (j = ''));
      if (f && (!g || g.indexOf(',' + d + ',') >= 0)) {
        switch (d) {
          case 'supplementalDataID':
            d = 'sdid';
            break;
          case 'timestamp':
            d = 'ts';
            break;
          case 'dynamicVariablePrefix':
            d = 'D';
            break;
          case 'visitorID':
            d = 'vid';
            break;
          case 'marketingCloudVisitorID':
            d = 'mid';
            break;
          case 'analyticsVisitorID':
            d = 'aid';
            break;
          case 'audienceManagerLocationHint':
            d = 'aamlh';
            break;
          case 'audienceManagerBlob':
            d = 'aamb';
            break;
          case 'pageURL':
            d = 'g';
            if (f.length > 255)
              (s.pageURLRest = f.substring(255)), (f = f.substring(0, 255));
            break;
          case 'pageURLRest':
            d = '-g';
            break;
          case 'referrer':
            d = 'r';
            break;
          case 'vmk':
          case 'visitorMigrationKey':
            d = 'vmt';
            break;
          case 'visitorMigrationServer':
            d = 'vmf';
            s.ssl && s.visitorMigrationServerSecure && (f = '');
            break;
          case 'visitorMigrationServerSecure':
            d = 'vmf';
            !s.ssl && s.visitorMigrationServer && (f = '');
            break;
          case 'charSet':
            d = 'ce';
            break;
          case 'visitorNamespace':
            d = 'ns';
            break;
          case 'cookieDomainPeriods':
            d = 'cdp';
            break;
          case 'cookieLifetime':
            d = 'cl';
            break;
          case 'variableProvider':
            d = 'vvp';
            break;
          case 'currencyCode':
            d = 'cc';
            break;
          case 'channel':
            d = 'ch';
            break;
          case 'transactionID':
            d = 'xact';
            break;
          case 'campaign':
            d = 'v0';
            break;
          case 'resolution':
            d = 's';
            break;
          case 'colorDepth':
            d = 'c';
            break;
          case 'javascriptVersion':
            d = 'j';
            break;
          case 'javaEnabled':
            d = 'v';
            break;
          case 'cookiesEnabled':
            d = 'k';
            break;
          case 'browserWidth':
            d = 'bw';
            break;
          case 'browserHeight':
            d = 'bh';
            break;
          case 'connectionType':
            d = 'ct';
            break;
          case 'homepage':
            d = 'hp';
            break;
          case 'plugins':
            d = 'p';
            break;
          case 'events':
            j && (f += (f != '' ? ',' : '') + j);
            if (k) {
              i = f.split(',');
              f = '';
              for (e = 0; e < i.length; e++)
                (m = i[e]),
                  (w = m.indexOf('=')),
                  w >= 0 && (m = m.substring(0, w)),
                  (w = m.indexOf(':')),
                  w >= 0 && (m = m.substring(0, w)),
                  k.indexOf(',' + m + ',') >= 0 && (f += (f ? ',' : '') + i[e]);
            }
            break;
          case 'events2':
            f = '';
            break;
          case 'contextData':
            b += s.J('c', s[d], g, d);
            f = '';
            break;
          case 'lightProfileID':
            d = 'mtp';
            break;
          case 'lightStoreForSeconds':
            d = 'mtss';
            s.lightProfileID || (f = '');
            break;
          case 'lightIncrementBy':
            d = 'mti';
            s.lightProfileID || (f = '');
            break;
          case 'retrieveLightProfiles':
            d = 'mtsr';
            break;
          case 'deleteLightProfiles':
            d = 'mtsd';
            break;
          case 'retrieveLightData':
            s.retrieveLightProfiles && (b += s.J('mts', s[d], g, d));
            f = '';
            break;
          default:
            s.oa(i) &&
              (e == 'prop'
                ? (d = 'c' + i)
                : e == 'eVar'
                ? (d = 'v' + i)
                : e == 'list'
                ? (d = 'l' + i)
                : e == 'hier' && ((d = 'h' + i), (f = f.substring(0, 255))));
        }
        f &&
          (b += '&' + d + '=' + (d.substring(0, 3) != 'pev' ? s.escape(f) : f));
      }
      d == 'pev3' && s.g && (b += s.g);
    }
    return b;
  };
  s.v = function (s) {
    var a = s.tagName;
    if (
      '' + s.sb != 'undefined' ||
      ('' + s.eb != 'undefined' && ('' + s.eb).toUpperCase() != 'HTML')
    )
      return '';
    a = a && a.toUpperCase ? a.toUpperCase() : '';
    a == 'SHAPE' && (a = '');
    a &&
      ((a == 'INPUT' || a == 'BUTTON') && s.type && s.type.toUpperCase
        ? (a = s.type.toUpperCase())
        : !a && s.href && (a = 'A'));
    return a;
  };
  s.ka = function (s) {
    var a = s.href ? s.href : '',
      c,
      e,
      d;
    c = a.indexOf(':');
    e = a.indexOf('?');
    d = a.indexOf('/');
    if (a && (c < 0 || (e >= 0 && c > e) || (d >= 0 && c > d)))
      (e =
        s.protocol && s.protocol.length > 1
          ? s.protocol
          : l.protocol
          ? l.protocol
          : ''),
        (c = l.pathname.lastIndexOf('/')),
        (a =
          (e ? e + '//' : '') +
          (s.host ? s.host : l.host ? l.host : '') +
          (h.substring(0, 1) != '/'
            ? l.pathname.substring(0, c < 0 ? 0 : c) + '/'
            : '') +
          a);
    return a;
  };
  s.F = function (b) {
    var a = s.v(b),
      c,
      e,
      d = '',
      f = 0;
    if (a) {
      c = b.protocol;
      e = b.onclick;
      if (
        b.href &&
        (a == 'A' || a == 'AREA') &&
        (!e || !c || c.toLowerCase().indexOf('javascript') < 0)
      )
        d = s.ka(b);
      else if (e)
        (d = s.replace(
          s.replace(s.replace(s.replace('' + e, '\r', ''), '\n', ''), '\t', ''),
          ' ',
          ''
        )),
          (f = 2);
      else if (a == 'INPUT' || a == 'SUBMIT') {
        if (b.value) d = b.value;
        else if (b.innerText) d = b.innerText;
        else if (b.textContent) d = b.textContent;
        f = 3;
      } else if (b.src && a == 'IMAGE') d = b.src;
      if (d) return { id: d.substring(0, 100), type: f };
    }
    return 0;
  };
  s.pb = function (b) {
    for (var a = s.v(b), c = s.F(b); b && !c && a != 'BODY'; )
      if ((b = b.parentElement ? b.parentElement : b.parentNode))
        (a = s.v(b)), (c = s.F(b));
    if (!c || a == 'BODY') b = 0;
    if (
      b &&
      ((a = b.onclick ? '' + b.onclick : ''),
      a.indexOf('.tl(') >= 0 || a.indexOf('.trackLink(') >= 0)
    )
      b = 0;
    return b;
  };
  s.bb = function () {
    var b,
      a,
      c = s.linkObject,
      e = s.linkType,
      d = s.linkURL,
      f,
      i;
    s.V = 1;
    if (!c) (s.V = 0), (c = s.j);
    if (c) {
      b = s.v(c);
      for (a = s.F(c); c && !a && b != 'BODY'; )
        if ((c = c.parentElement ? c.parentElement : c.parentNode))
          (b = s.v(c)), (a = s.F(c));
      if (!a || b == 'BODY') c = 0;
      if (c) {
        var m = c.onclick ? '' + c.onclick : '';
        if (m.indexOf('.tl(') >= 0 || m.indexOf('.trackLink(') >= 0) c = 0;
      }
    } else s.V = 1;
    !d && c && (d = s.ka(c));
    d &&
      !s.linkLeaveQueryString &&
      ((f = d.indexOf('?')), f >= 0 && (d = d.substring(0, f)));
    if (!e && d) {
      var g = 0,
        k = 0,
        j;
      if (s.trackDownloadLinks && s.linkDownloadFileTypes) {
        m = d.toLowerCase();
        f = m.indexOf('?');
        i = m.indexOf('#');
        f >= 0 ? i >= 0 && i < f && (f = i) : (f = i);
        f >= 0 && (m = m.substring(0, f));
        f = s.linkDownloadFileTypes.toLowerCase().split(',');
        for (i = 0; i < f.length; i++)
          (j = f[i]) &&
            m.substring(m.length - (j.length + 1)) == '.' + j &&
            (e = 'd');
      }
      if (s.trackExternalLinks && !e && ((m = d.toLowerCase()), s.na(m))) {
        if (!s.linkInternalFilters) s.linkInternalFilters = w.location.hostname;
        f = 0;
        s.linkExternalFilters
          ? ((f = s.linkExternalFilters.toLowerCase().split(',')), (g = 1))
          : s.linkInternalFilters &&
            (f = s.linkInternalFilters.toLowerCase().split(','));
        if (f) {
          for (i = 0; i < f.length; i++)
            (j = f[i]), m.indexOf(j) >= 0 && (k = 1);
          k ? g && (e = 'e') : g || (e = 'e');
        }
      }
    }
    s.linkObject = c;
    s.linkURL = d;
    s.linkType = e;
    if (s.trackClickMap || s.trackInlineStats)
      if (((s.g = ''), c)) {
        e = s.pageName;
        d = 1;
        c = c.sourceIndex;
        if (!e) (e = s.pageURL), (d = 0);
        if (w.s_objectID) (a.id = w.s_objectID), (c = a.type = 1);
        if (e && a && a.id && b)
          s.g =
            '&pid=' +
            s.escape(e.substring(0, 255)) +
            (d ? '&pidt=' + d : '') +
            '&oid=' +
            s.escape(a.id.substring(0, 100)) +
            (a.type ? '&oidt=' + a.type : '') +
            '&ot=' +
            b +
            (c ? '&oi=' + c : '');
      }
  };
  s.Ta = function () {
    var b = s.V,
      a = s.linkType,
      c = s.linkURL,
      e = s.linkName;
    if (a && (c || e))
      (a = a.toLowerCase()),
        a != 'd' && a != 'e' && (a = 'o'),
        (s.pe = 'lnk_' + a),
        (s.pev1 = c ? s.escape(c) : ''),
        (s.pev2 = e ? s.escape(e) : ''),
        (b = 1);
    s.abort && (b = 0);
    if (s.trackClickMap || s.trackInlineStats) {
      a = {};
      c = 0;
      var d = s.cookieRead('s_sq'),
        f = d ? d.split('&') : 0,
        i,
        w,
        g;
      d = 0;
      if (f)
        for (i = 0; i < f.length; i++)
          (w = f[i].split('=')),
            (e = s.unescape(w[0]).split(',')),
            (w = s.unescape(w[1])),
            (a[w] = e);
      e = s.account.split(',');
      if (b || s.g) {
        b && !s.g && (d = 1);
        for (w in a)
          if (!Object.prototype[w])
            for (i = 0; i < e.length; i++) {
              d &&
                ((g = a[w].join(',')),
                g == s.account &&
                  ((s.g += (w.charAt(0) != '&' ? '&' : '') + w),
                  (a[w] = []),
                  (c = 1)));
              for (f = 0; f < a[w].length; f++)
                (g = a[w][f]),
                  g == e[i] &&
                    (d &&
                      (s.g +=
                        '&u=' +
                        s.escape(g) +
                        (w.charAt(0) != '&' ? '&' : '') +
                        w +
                        '&u=0'),
                    a[w].splice(f, 1),
                    (c = 1));
            }
        b || (c = 1);
        if (c) {
          d = '';
          i = 2;
          !b &&
            s.g &&
            ((d = s.escape(e.join(',')) + '=' + s.escape(s.g)), (i = 1));
          for (w in a)
            !Object.prototype[w] &&
              i > 0 &&
              a[w].length > 0 &&
              ((d +=
                (d ? '&' : '') + s.escape(a[w].join(',')) + '=' + s.escape(w)),
              i--);
          s.cookieWrite('s_sq', d);
        }
      }
    }
    return b;
  };
  s.Ua = function () {
    if (!s.jb) {
      var b = new Date(),
        a = j.location,
        c,
        e,
        d,
        f = (d = e = c = ''),
        i = '',
        w = '',
        g = '1.2',
        k = s.cookieWrite('s_cc', 'true', 0) ? 'Y' : 'N',
        o = '',
        p = '',
        n = 0;
      if (
        b.setUTCDate &&
        ((g = '1.3'), n.toPrecision && ((g = '1.5'), (c = []), c.forEach))
      ) {
        g = '1.6';
        d = 0;
        e = {};
        try {
          (d = new Iterator(e)),
            d.next &&
              ((g = '1.7'),
              c.reduce &&
                ((g = '1.8'),
                g.trim &&
                  ((g = '1.8.1'),
                  Date.parse &&
                    ((g = '1.8.2'), Object.create && (g = '1.8.5')))));
        } catch (r) {}
      }
      c = screen.width + 'x' + screen.height;
      d = navigator.javaEnabled() ? 'Y' : 'N';
      e = screen.pixelDepth ? screen.pixelDepth : screen.colorDepth;
      i = s.w.innerWidth ? s.w.innerWidth : s.d.documentElement.offsetWidth;
      w = s.w.innerHeight ? s.w.innerHeight : s.d.documentElement.offsetHeight;
      b = navigator.plugins;
      try {
        s.b.addBehavior('#default#homePage'), (o = s.b.qb(a) ? 'Y' : 'N');
      } catch (t) {}
      try {
        s.b.addBehavior('#default#clientCaps'), (p = s.b.connectionType);
      } catch (u) {}
      if (b)
        for (; n < b.length && n < 30; ) {
          if ((a = b[n].name))
            (a = a.substring(0, 100) + ';'), f.indexOf(a) < 0 && (f += a);
          n++;
        }
      s.resolution = c;
      s.colorDepth = e;
      s.javascriptVersion = g;
      s.javaEnabled = d;
      s.cookiesEnabled = k;
      s.browserWidth = i;
      s.browserHeight = w;
      s.connectionType = p;
      s.homepage = o;
      s.plugins = f;
      s.jb = 1;
    }
  };
  s.I = {};
  s.loadModule = function (b, a) {
    var c = s.I[b];
    if (!c) {
      c = w['AppMeasurement_Module_' + b]
        ? new w['AppMeasurement_Module_' + b](s)
        : {};
      s.I[b] = s[b] = c;
      c.Ba = function () {
        return c.Ea;
      };
      c.Fa = function (a) {
        if ((c.Ea = a))
          (s[b + '_onLoad'] = a), s.C(b + '_onLoad', [s, c], 1) || a(s, c);
      };
      try {
        Object.defineProperty
          ? Object.defineProperty(c, 'onLoad', { get: c.Ba, set: c.Fa })
          : (c._olc = 1);
      } catch (e) {
        c._olc = 1;
      }
    }
    a && ((s[b + '_onLoad'] = a), s.C(b + '_onLoad', [s, c], 1) || a(s, c));
  };
  s.r = function (b) {
    var a, c;
    for (a in s.I)
      if (!Object.prototype[a] && (c = s.I[a])) {
        if (c._olc && c.onLoad) (c._olc = 0), c.onLoad(s, c);
        if (c[b] && c[b]()) return 1;
      }
    return 0;
  };
  s.Xa = function () {
    var b = Math.floor(Math.random() * 1e13),
      a = s.visitorSampling,
      c = s.visitorSamplingGroup;
    c =
      's_vsn_' +
      (s.visitorNamespace ? s.visitorNamespace : s.account) +
      (c ? '_' + c : '');
    var e = s.cookieRead(c);
    if (a) {
      e && (e = parseInt(e));
      if (!e) {
        if (!s.cookieWrite(c, b)) return 0;
        e = b;
      }
      if (e % 1e4 > v) return 0;
    }
    return 1;
  };
  s.K = function (b, a) {
    var c, e, d, f, w, g;
    for (c = 0; c < 2; c++) {
      e = c > 0 ? s.ea : s.c;
      for (d = 0; d < e.length; d++)
        if (((f = e[d]), (w = b[f]) || b['!' + f])) {
          if (!a && (f == 'contextData' || f == 'retrieveLightData') && s[f])
            for (g in s[f]) w[g] || (w[g] = s[f][g]);
          s[f] = w;
        }
    }
  };
  s.wa = function (b, a) {
    var c, e, d, f;
    for (c = 0; c < 2; c++) {
      e = c > 0 ? s.ea : s.c;
      for (d = 0; d < e.length; d++)
        (f = e[d]), (b[f] = s[f]), !a && !b[f] && (b['!' + f] = 1);
    }
  };
  s.Pa = function (s) {
    var a,
      c,
      e,
      d,
      f,
      w = 0,
      g,
      k = '',
      j = '';
    if (
      s &&
      s.length > 255 &&
      ((a = '' + s),
      (c = a.indexOf('?')),
      c > 0 &&
        ((g = a.substring(c + 1)),
        (a = a.substring(0, c)),
        (d = a.toLowerCase()),
        (e = 0),
        d.substring(0, 7) == 'http://'
          ? (e += 7)
          : d.substring(0, 8) == 'https://' && (e += 8),
        (c = d.indexOf('/', e)),
        c > 0 &&
          ((d = d.substring(e, c)),
          (f = a.substring(c)),
          (a = a.substring(0, c)),
          d.indexOf('google') >= 0
            ? (w = ',q,ie,start,search_key,word,kw,cd,')
            : d.indexOf('yahoo.co') >= 0 && (w = ',p,ei,'),
          w && g)))
    ) {
      if ((s = g.split('&')) && s.length > 1) {
        for (e = 0; e < s.length; e++)
          (d = s[e]),
            (c = d.indexOf('=')),
            c > 0 && w.indexOf(',' + d.substring(0, c) + ',') >= 0
              ? (k += (k ? '&' : '') + d)
              : (j += (j ? '&' : '') + d);
        k && j ? (g = k + '&' + j) : (j = '');
      }
      c = 253 - (g.length - j.length) - a.length;
      s = a + (c > 0 ? f.substring(0, c) : '') + '?' + g;
    }
    return s;
  };
  s.O = !1;
  s.da = !1;
  s.Da = function (b) {
    s.marketingCloudVisitorID = b;
    s.da = !0;
    s.l();
  };
  s.L = !1;
  s.aa = !1;
  s.ya = function (b) {
    s.analyticsVisitorID = b;
    s.aa = !0;
    s.l();
  };
  s.N = !1;
  s.ca = !1;
  s.Aa = function (b) {
    s.audienceManagerLocationHint = b;
    s.ca = !0;
    s.l();
  };
  s.M = !1;
  s.ba = !1;
  s.za = function (b) {
    s.audienceManagerBlob = b;
    s.ba = !0;
    s.l();
  };
  s.isReadyToTrack = function () {
    var b = !0,
      a = s.visitor;
    if (a && a.isAllowed()) {
      if (
        !s.O &&
        !s.marketingCloudVisitorID &&
        a.getMarketingCloudVisitorID &&
        ((s.marketingCloudVisitorID = a.getMarketingCloudVisitorID([s, s.Da])),
        !s.marketingCloudVisitorID)
      )
        s.O = !0;
      if (
        !s.L &&
        !s.analyticsVisitorID &&
        a.getAnalyticsVisitorID &&
        ((s.analyticsVisitorID = a.getAnalyticsVisitorID([s, s.ya])),
        !s.analyticsVisitorID)
      )
        s.L = !0;
      if (
        !s.N &&
        !s.audienceManagerLocationHint &&
        a.getAudienceManagerLocationHint &&
        ((s.audienceManagerLocationHint = a.getAudienceManagerLocationHint([
          s,
          s.Aa,
        ])),
        !s.audienceManagerLocationHint)
      )
        s.N = !0;
      if (
        !s.M &&
        !s.audienceManagerBlob &&
        a.getAudienceManagerBlob &&
        ((s.audienceManagerBlob = a.getAudienceManagerBlob([s, s.za])),
        !s.audienceManagerBlob)
      )
        s.M = !0;
      if (
        (s.O && !s.da && !s.marketingCloudVisitorID) ||
        (s.L && !s.aa && !s.analyticsVisitorID) ||
        (s.N && !s.ca && !s.audienceManagerLocationHint) ||
        (s.M && !s.ba && !s.audienceManagerBlob)
      )
        b = !1;
    }
    return b;
  };
  s.k = k;
  s.o = 0;
  s.callbackWhenReadyToTrack = function (b, a, c) {
    var e;
    e = {};
    e.Ja = b;
    e.Ia = a;
    e.Ga = c;
    if (s.k == k) s.k = [];
    s.k.push(e);
    if (s.o == 0) s.o = setInterval(s.l, 100);
  };
  s.l = function () {
    var b;
    if (s.isReadyToTrack()) {
      if (s.o) clearInterval(s.o), (s.o = 0);
      if (s.k != k)
        for (; s.k.length > 0; ) (b = s.k.shift()), b.Ia.apply(b.Ja, b.Ga);
    }
  };
  s.Ca = function (b) {
    var a,
      c,
      e = k,
      d = k;
    if (!s.isReadyToTrack()) {
      a = [];
      if (b != k) for (c in ((e = {}), b)) e[c] = b[c];
      d = {};
      s.wa(d, !0);
      a.push(e);
      a.push(d);
      s.callbackWhenReadyToTrack(s, s.track, a);
      return !0;
    }
    return !1;
  };
  s.Ra = function () {
    var b = s.cookieRead('s_fid'),
      a = '',
      c = '',
      e;
    e = 8;
    var d = 4;
    if (!b || b.indexOf('-') < 0) {
      for (b = 0; b < 16; b++)
        (e = Math.floor(Math.random() * e)),
          (a += '0123456789ABCDEF'.substring(e, e + 1)),
          (e = Math.floor(Math.random() * d)),
          (c += '0123456789ABCDEF'.substring(e, e + 1)),
          (e = d = 16);
      b = a + '-' + c;
    }
    s.cookieWrite('s_fid', b, 1) || (b = 0);
    return b;
  };
  s.t = s.track = function (b, a) {
    var c,
      e = new Date(),
      d =
        's' +
        (Math.floor(e.getTime() / 108e5) % 10) +
        Math.floor(Math.random() * 1e13),
      f = e.getYear();
    f =
      't=' +
      s.escape(
        e.getDate() +
          '/' +
          e.getMonth() +
          '/' +
          (f < 1900 ? f + 1900 : f) +
          ' ' +
          e.getHours() +
          ':' +
          e.getMinutes() +
          ':' +
          e.getSeconds() +
          ' ' +
          e.getDay() +
          ' ' +
          e.getTimezoneOffset()
      );
    if (!s.supplementalDataID && s.visitor && s.visitor.getSupplementalDataID)
      s.supplementalDataID = s.visitor.getSupplementalDataID(
        'AppMeasurement:' + s._in,
        s.expectSupplementalData ? !1 : !0
      );
    s.r('_s');
    if (!s.C('track', arguments)) {
      if (!s.Ca(b)) {
        a && s.K(a);
        b && ((c = {}), s.wa(c, 0), s.K(b));
        if (s.Xa()) {
          if (!s.analyticsVisitorID && !s.marketingCloudVisitorID)
            s.fid = s.Ra();
          s.bb();
          s.usePlugins && s.doPlugins && s.doPlugins(s);
          if (s.account) {
            if (!s.abort) {
              if (s.trackOffline && !s.timestamp)
                s.timestamp = Math.floor(e.getTime() / 1e3);
              e = w.location;
              if (!s.pageURL) s.pageURL = e.href ? e.href : e;
              if (!s.referrer && !s.xa)
                (s.referrer = j.document.referrer), (s.xa = 1);
              s.referrer = s.Pa(s.referrer);
              s.r('_g');
            }
            if (s.Ta() && !s.abort)
              s.Ua(), (f += s.Sa()), s.ab(d, f), s.r('_t'), (s.referrer = '');
          }
        }
        b && s.K(c, 1);
      }
      s.abort =
        s.supplementalDataID =
        s.timestamp =
        s.pageURLRest =
        s.linkObject =
        s.j =
        s.linkURL =
        s.linkName =
        s.linkType =
        w.rb =
        s.pe =
        s.pev1 =
        s.pev2 =
        s.pev3 =
        s.g =
          0;
    }
  };
  s.tl = s.trackLink = function (b, a, c, e, d) {
    s.linkObject = b;
    s.linkType = a;
    s.linkName = c;
    if (d) (s.i = b), (s.q = d);
    return s.track(e);
  };
  s.trackLight = function (b, a, c, e) {
    s.lightProfileID = b;
    s.lightStoreForSeconds = a;
    s.lightIncrementBy = c;
    return s.track(e);
  };
  s.clearVars = function () {
    var b, a;
    for (b = 0; b < s.c.length; b++)
      if (
        ((a = s.c[b]),
        a.substring(0, 4) == 'prop' ||
          a.substring(0, 4) == 'eVar' ||
          a.substring(0, 4) == 'hier' ||
          a.substring(0, 4) == 'list' ||
          a == 'channel' ||
          a == 'events' ||
          a == 'eventList' ||
          a == 'products' ||
          a == 'productList' ||
          a == 'purchaseID' ||
          a == 'transactionID' ||
          a == 'state' ||
          a == 'zip' ||
          a == 'campaign')
      )
        s[a] = void 0;
  };
  s.ab = function (b, a) {
    var c,
      e = s.trackingServer;
    c = '';
    var d = s.dc,
      f = 'sc.',
      w = s.visitorNamespace;
    if (e) {
      if (s.trackingServerSecure && s.ssl) e = s.trackingServerSecure;
    } else {
      if (!w)
        (w = s.account),
          (e = w.indexOf(',')),
          e >= 0 && (w = w.substring(0, e)),
          (w = w.replace(/[^A-Za-z0-9]/g, ''));
      c || (c = '2o7.net');
      d = d ? ('' + d).toLowerCase() : 'd1';
      c == '2o7.net' &&
        (d == 'd1' ? (d = '112') : d == 'd2' && (d = '122'), (f = ''));
      e = w + '.' + d + '.' + f + c;
    }
    c = s.ssl ? 'https://' : 'http://';
    d = s.AudienceManagement && s.AudienceManagement.isReady();
    c +=
      e +
      '/b/ss/' +
      s.account +
      '/' +
      (s.mobile ? '5.' : '') +
      (d ? '10' : '1') +
      '/JS-' +
      s.version +
      (s.ib ? 'T' : '') +
      '/' +
      b +
      '?AQB=1&ndh=1&' +
      (d ? 'callback=s_c_il[' + s._in + '].AudienceManagement.passData&' : '') +
      a +
      '&AQE=1';
    s.Wa && (c = c.substring(0, 2047));
    s.Na(c);
    s.S();
  };
  s.Na = function (b) {
    s.e || s.Va();
    s.e.push(b);
    s.T = s.u();
    s.va();
  };
  s.Va = function () {
    s.e = s.Ya();
    if (!s.e) s.e = [];
  };
  s.Ya = function () {
    var b, a;
    if (s.Y()) {
      try {
        (a = w.localStorage.getItem(s.W())) && (b = w.JSON.parse(a));
      } catch (c) {}
      return b;
    }
  };
  s.Y = function () {
    var b = !0;
    if (!s.trackOffline || !s.offlineFilename || !w.localStorage || !w.JSON)
      b = !1;
    return b;
  };
  s.la = function () {
    var b = 0;
    if (s.e) b = s.e.length;
    s.z && b++;
    return b;
  };
  s.S = function () {
    if (!s.z)
      if (((s.ma = k), s.X)) s.T > s.G && s.ta(s.e), s.$(500);
      else {
        var b = s.Ha();
        if (b > 0) s.$(b);
        else if ((b = s.ja())) (s.z = 1), s.$a(b), s.fb(b);
      }
  };
  s.$ = function (b) {
    if (!s.ma) b || (b = 0), (s.ma = setTimeout(s.S, b));
  };
  s.Ha = function () {
    var b;
    if (!s.trackOffline || s.offlineThrottleDelay <= 0) return 0;
    b = s.u() - s.ra;
    if (s.offlineThrottleDelay < b) return 0;
    return s.offlineThrottleDelay - b;
  };
  s.ja = function () {
    if (s.e.length > 0) return s.e.shift();
  };
  s.$a = function (b) {
    if (s.debugTracking) {
      var a = 'AppMeasurement Debug: ' + b;
      b = b.split('&');
      var c;
      for (c = 0; c < b.length; c++) a += '\n\t' + s.unescape(b[c]);
      s.Za(a);
    }
  };
  s.fb = function (b) {
    var a, c, e;
    if (
      !a &&
      s.d.createElement &&
      s.AudienceManagement &&
      s.AudienceManagement.isReady() &&
      (a = s.d.createElement('SCRIPT')) &&
      'async' in a
    )
      (e = (e = s.d.getElementsByTagName('HEAD')) && e[0] ? e[0] : s.d.body)
        ? ((a.type = 'text/javascript'),
          a.setAttribute('async', 'async'),
          (c = 3))
        : (a = 0);
    if (!a) (a = new Image()), (a.alt = '');
    a.ga = function () {
      try {
        if (s.Z) clearTimeout(s.Z), (s.Z = 0);
        if (a.timeout) clearTimeout(a.timeout), (a.timeout = 0);
      } catch (b) {}
    };
    a.onload = a.hb = function () {
      a.ga();
      s.Ma();
      s.P();
      s.z = 0;
      s.S();
    };
    a.onabort =
      a.onerror =
      a.Oa =
        function () {
          a.ga();
          (s.trackOffline || s.X) && s.z && s.e.unshift(s.La);
          s.z = 0;
          s.T > s.G && s.ta(s.e);
          s.P();
          s.$(500);
        };
    a.onreadystatechange = function () {
      a.readyState == 4 && (a.status == 200 ? a.hb() : a.Oa());
    };
    s.ra = s.u();
    if (c == 1) a.open('GET', b, !0), a.send();
    else if (c == 2) a.open('GET', b), a.send();
    else if (((a.src = b), c == 3)) {
      if (s.pa)
        try {
          e.removeChild(s.pa);
        } catch (d) {}
      e.firstChild ? e.insertBefore(a, e.firstChild) : e.appendChild(a);
      s.pa = s.Ka;
    }
    if (a.abort) s.Z = setTimeout(a.abort, 5e3);
    s.La = b;
    s.Ka = w['s_i_' + s.replace(s.account, ',', '_')] = a;
    if ((s.useForcedLinkTracking && s.B) || s.q) {
      if (!s.forcedLinkTrackingTimeout) s.forcedLinkTrackingTimeout = 250;
      s.Q = setTimeout(s.P, s.forcedLinkTrackingTimeout);
    }
  };
  s.Ma = function () {
    if (s.Y() && !(s.qa > s.G))
      try {
        w.localStorage.removeItem(s.W()), (s.qa = s.u());
      } catch (b) {}
  };
  s.ta = function (b) {
    if (s.Y()) {
      s.va();
      try {
        w.localStorage.setItem(s.W(), w.JSON.stringify(b)), (s.G = s.u());
      } catch (a) {}
    }
  };
  s.va = function () {
    if (s.trackOffline) {
      if (!s.offlineLimit || s.offlineLimit <= 0) s.offlineLimit = 10;
      for (; s.e.length > s.offlineLimit; ) s.ja();
    }
  };
  s.forceOffline = function () {
    s.X = !0;
  };
  s.forceOnline = function () {
    s.X = !1;
  };
  s.W = function () {
    return s.offlineFilename + '-' + s.visitorNamespace + s.account;
  };
  s.u = function () {
    return new Date().getTime();
  };
  s.na = function (s) {
    s = s.toLowerCase();
    if (
      s.indexOf('#') != 0 &&
      s.indexOf('about:') != 0 &&
      s.indexOf('opera:') != 0 &&
      s.indexOf('javascript:') != 0
    )
      return !0;
    return !1;
  };
  s.setTagContainer = function (b) {
    var a, c, e;
    s.ib = b;
    for (a = 0; a < s._il.length; a++)
      if ((c = s._il[a]) && c._c == 's_l' && c.tagContainerName == b) {
        s.K(c);
        if (c.lmq)
          for (a = 0; a < c.lmq.length; a++) (e = c.lmq[a]), s.loadModule(e.n);
        if (c.ml)
          for (e in c.ml)
            if (s[e])
              for (a in ((b = s[e]), (e = c.ml[e]), e))
                if (
                  !Object.prototype[a] &&
                  (typeof e[a] != 'function' ||
                    ('' + e[a]).indexOf('s_c_il') < 0)
                )
                  b[a] = e[a];
        if (c.mmq)
          for (a = 0; a < c.mmq.length; a++)
            (e = c.mmq[a]),
              s[e.m] &&
                ((b = s[e.m]),
                b[e.f] &&
                  typeof b[e.f] == 'function' &&
                  (e.a ? b[e.f].apply(b, e.a) : b[e.f].apply(b)));
        if (c.tq) for (a = 0; a < c.tq.length; a++) s.track(c.tq[a]);
        c.s = s;
        break;
      }
  };
  s.Util = {
    urlEncode: s.escape,
    urlDecode: s.unescape,
    cookieRead: s.cookieRead,
    cookieWrite: s.cookieWrite,
    getQueryParam: function (b, a, c) {
      var e;
      a || (a = s.pageURL ? s.pageURL : w.location);
      c || (c = '&');
      if (
        b &&
        a &&
        ((a = '' + a),
        (e = a.indexOf('?')),
        e >= 0 &&
          ((a = c + a.substring(e + 1) + c),
          (e = a.indexOf(c + b + '=')),
          e >= 0 &&
            ((a = a.substring(e + c.length + b.length + 1)),
            (e = a.indexOf(c)),
            e >= 0 && (a = a.substring(0, e)),
            a.length > 0)))
      )
        return s.unescape(a);
      return '';
    },
  };
  s.A = [
    'supplementalDataID',
    'timestamp',
    'dynamicVariablePrefix',
    'visitorID',
    'marketingCloudVisitorID',
    'analyticsVisitorID',
    'audienceManagerLocationHint',
    'fid',
    'vmk',
    'visitorMigrationKey',
    'visitorMigrationServer',
    'visitorMigrationServerSecure',
    'charSet',
    'visitorNamespace',
    'cookieDomainPeriods',
    'fpCookieDomainPeriods',
    'cookieLifetime',
    'pageName',
    'pageURL',
    'referrer',
    'contextData',
    'currencyCode',
    'lightProfileID',
    'lightStoreForSeconds',
    'lightIncrementBy',
    'retrieveLightProfiles',
    'deleteLightProfiles',
    'retrieveLightData',
    'pe',
    'pev1',
    'pev2',
    'pev3',
    'pageURLRest',
  ];
  s.c = s.A.concat([
    'purchaseID',
    'variableProvider',
    'channel',
    'server',
    'pageType',
    'transactionID',
    'campaign',
    'state',
    'zip',
    'events',
    'events2',
    'products',
    'audienceManagerBlob',
    'tnt',
  ]);
  s.U = [
    'timestamp',
    'charSet',
    'visitorNamespace',
    'cookieDomainPeriods',
    'cookieLifetime',
    'contextData',
    'lightProfileID',
    'lightStoreForSeconds',
    'lightIncrementBy',
  ];
  s.H = s.U.slice(0);
  s.ea = [
    'account',
    'allAccounts',
    'debugTracking',
    'visitor',
    'trackOffline',
    'offlineLimit',
    'offlineThrottleDelay',
    'offlineFilename',
    'usePlugins',
    'doPlugins',
    'configURL',
    'visitorSampling',
    'visitorSamplingGroup',
    'linkObject',
    'linkURL',
    'linkName',
    'linkType',
    'trackDownloadLinks',
    'trackExternalLinks',
    'trackClickMap',
    'trackInlineStats',
    'linkLeaveQueryString',
    'linkTrackVars',
    'linkTrackEvents',
    'linkDownloadFileTypes',
    'linkExternalFilters',
    'linkInternalFilters',
    'useForcedLinkTracking',
    'forcedLinkTrackingTimeout',
    'trackingServer',
    'trackingServerSecure',
    'ssl',
    'abort',
    'mobile',
    'dc',
    'lightTrackVars',
    'maxDelay',
    'expectSupplementalData',
    'AudienceManagement',
  ];
  for (g = 0; g <= 75; g++)
    s.c.push('prop' + g),
      s.H.push('prop' + g),
      s.c.push('eVar' + g),
      s.H.push('eVar' + g),
      g < 6 && s.c.push('hier' + g),
      g < 4 && s.c.push('list' + g);
  g = [
    'resolution',
    'colorDepth',
    'javascriptVersion',
    'javaEnabled',
    'cookiesEnabled',
    'browserWidth',
    'browserHeight',
    'connectionType',
    'homepage',
    'plugins',
  ];
  s.c = s.c.concat(g);
  s.A = s.A.concat(g);
  s.ssl = w.location.protocol.toLowerCase().indexOf('https') >= 0;
  s.charSet = 'UTF-8';
  s.contextData = {};
  s.offlineThrottleDelay = 0;
  s.offlineFilename = 'AppMeasurement.offline';
  s.ra = 0;
  s.T = 0;
  s.G = 0;
  s.qa = 0;
  s.linkDownloadFileTypes =
    'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
  s.w = w;
  s.d = w.document;
  try {
    s.Wa = navigator.appName == 'Microsoft Internet Explorer';
  } catch (n) {}
  s.P = function () {
    if (s.Q) w.clearTimeout(s.Q), (s.Q = k);
    s.i && s.B && s.i.dispatchEvent(s.B);
    if (s.q)
      if (typeof s.q == 'function') s.q();
      else if (s.i && s.i.href) s.d.location = s.i.href;
    s.i = s.B = s.q = 0;
  };
  s.ua = function () {
    s.b = s.d.body;
    if (s.b)
      if (
        ((s.p = function (b) {
          var a, c, e, d, f;
          if (!((s.d && s.d.getElementById('cppXYctnr')) || (b && b.cb))) {
            if (s.fa)
              if (s.useForcedLinkTracking)
                s.b.removeEventListener('click', s.p, !1);
              else {
                s.b.removeEventListener('click', s.p, !0);
                s.fa = s.useForcedLinkTracking = 0;
                return;
              }
            else s.useForcedLinkTracking = 0;
            s.j = b.srcElement ? b.srcElement : b.target;
            try {
              if (s.j && (s.j.tagName || s.j.parentElement || s.j.parentNode))
                if (
                  ((e = s.la()),
                  s.track(),
                  e < s.la() && s.useForcedLinkTracking && b.target)
                ) {
                  for (
                    d = b.target;
                    d &&
                    d != s.b &&
                    d.tagName.toUpperCase() != 'A' &&
                    d.tagName.toUpperCase() != 'AREA';

                  )
                    d = d.parentNode;
                  if (
                    d &&
                    ((f = d.href),
                    s.na(f) || (f = 0),
                    (c = d.target),
                    b.target.dispatchEvent &&
                      f &&
                      (!c ||
                        c == '_self' ||
                        c == '_top' ||
                        c == '_parent' ||
                        (w.name && c == w.name)))
                  ) {
                    try {
                      a = s.d.createEvent('MouseEvents');
                    } catch (g) {
                      a = new w.MouseEvent();
                    }
                    if (a) {
                      try {
                        a.initMouseEvent(
                          'click',
                          b.bubbles,
                          b.cancelable,
                          b.view,
                          b.detail,
                          b.screenX,
                          b.screenY,
                          b.clientX,
                          b.clientY,
                          b.ctrlKey,
                          b.altKey,
                          b.shiftKey,
                          b.metaKey,
                          b.button,
                          b.relatedTarget
                        );
                      } catch (j) {
                        a = 0;
                      }
                      if (a)
                        (a.cb = 1),
                          b.stopPropagation(),
                          b.gb && b.gb(),
                          b.preventDefault(),
                          (s.i = b.target),
                          (s.B = a);
                    }
                  }
                }
            } catch (k) {}
            s.j = 0;
          }
        }),
        s.b && s.b.attachEvent)
      )
        s.b.attachEvent('onclick', s.p);
      else {
        if (s.b && s.b.addEventListener) {
          if (
            navigator &&
            ((navigator.userAgent.indexOf('WebKit') >= 0 && s.d.createEvent) ||
              (navigator.userAgent.indexOf('Firefox/2') >= 0 && w.MouseEvent))
          )
            (s.fa = 1),
              (s.useForcedLinkTracking = 1),
              s.b.addEventListener('click', s.p, !0);
          s.b.addEventListener('click', s.p, !1);
        }
      }
    else setTimeout(s.ua, 30);
  };
  s.ua();
}
function s_gi(s) {
  var w,
    k = virtualWindow.s_c_il,
    j,
    g,
    o = s.split(','),
    p,
    n,
    b = 0;
  if (k)
    for (j = 0; !b && j < k.length; ) {
      w = k[j];
      if (w._c == 's_c' && (w.account || w.oun))
        if (w.account && w.account == s) b = 1;
        else {
          g = w.account ? w.account : w.oun;
          g = w.allAccounts ? w.allAccounts : g.split(',');
          for (p = 0; p < o.length; p++)
            for (n = 0; n < g.length; n++) o[p] == g[n] && (b = 1);
        }
      j++;
    }
  b || (w = new AppMeasurement());
  w.setAccount ? w.setAccount(s) : w.sa && w.sa(s);
  return w;
}
AppMeasurement.getInstance = s_gi;
virtualWindow.s_objectID || (virtualWindow.s_objectID = 0);
function s_pgicq() {
  var s = virtualWindow,
    w = s.s_giq,
    k,
    j,
    g;
  if (w)
    for (k = 0; k < w.length; k++)
      (j = w[k]),
        (g = s_gi(j.oun)),
        g.setAccount(j.un),
        g.setTagContainer(j.tagContainerName);
  s.s_giq = 0;
}
s_pgicq();
