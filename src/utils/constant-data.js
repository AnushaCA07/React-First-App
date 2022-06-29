export const missingFields = [
  {
    fieldName: 'photos',
    iconUrl: '/public/images/photos-missing.png',
    description: 'Upload a professional, yet friendly photo (smile).',
    buttonContent: 'Upload Photo',
    redirectUrl: '/provider/profile/{pwid}',
    className: ''
  },
  {
    fieldName: 'aboutme',
    iconUrl: '/public/images/aboutcontent.png',
    description:
      'Patients are looking for a connection. Personalize your profile with a custom care philosophy and biography statement only you can write. Share your unique story.',
    buttonContent: 'Update Biography',
    redirectUrl: '/provider/profile/{pwid}#general-info',
    className: 'middle-section'
  },
  {
    fieldName: 'degree',
    iconUrl: '/public/images/degree.png',
    description:
      'Patients are looking for a connection. Personalize your profile with a custom care philosophy and biography statement only you can write. Share your unique story.',
    buttonContent: 'Update Degree',
    redirectUrl: '/provider/profile/{pwid}#general-info',
    className: ''
  },
  {
    fieldName: 'insurance',
    iconUrl: '/public/images/insurance.png',
    description:
      'This is the #1 factor patients look for. Did you add or remove carriers or plans? Patients can directly type in their insurance information and receive a list of providers who currently accept it',
    buttonContent: 'Update Insurance',
    redirectUrl: '/provider/profile/{pwid}#insurance',
    className: ''
  },
  {
    fieldName: 'conditions',
    iconUrl: '/public/images/conditions.png',
    description:
      'Patients are able to search by a condition. Whether you treat a condition every day or very seldom, add or update all the conditions you treat.',
    buttonContent: 'Update Conditions',
    redirectUrl: '/provider/profile/{pwid}#conditions',
    className: 'middle-section'
  },
  {
    fieldName: 'procedures',
    iconUrl: '/public/images/procedures.png',
    description:
      'Clinical experience is very important. Patients can, and do, search for specific procedures they want or need. Add or update all the procedures you perform.',
    buttonContent: 'Update Procedures',
    redirectUrl: '/provider/profile/{pwid}#procedures-performed',
    className: ''
  },
  {
    fieldName: 'gender',
    iconUrl: '/public/images/gender.png',
    description:
      'As with age, patients tend to have a personal preference for the gender of their provider and often seek out this information as a deciding factor.',
    buttonContent: 'Update Gender',
    redirectUrl: '/provider/profile/{pwid}#general-info',
    className: ''
  },
  {
    fieldName: 'dateofbirth',
    iconUrl: '/public/images/dateofbirth.png',
    description:
      'Don’t worry, we protect the actual date. We provide only your age on your profile. While age is just a number, some patients do prefer an older or younger provider and can search by age range.',
    buttonContent: 'Update Date of birth',
    redirectUrl: '/provider/profile/{pwid}#general-info',
    className: 'middle-section'
  },
  {
    fieldName: 'acceptsnewpatients',
    iconUrl: '/public/images/acceptsnewpatients.png',
    description:
      'Are you accepting new patients or are you booked solid? Directly engage with patients by updating this field as often as you like. You control how many patients contact you from Healthgrades.',
    buttonContent: 'Update AcceptNewPatients',
    redirectUrl: '/provider/profile/{pwid}#general-info',
    className: ''
  },
  {
    fieldName: 'licenses',
    iconUrl: '/public/images/licenses.png',
    description:
      'Add credibility and reassurance to your profile by showcasing that you’ve got the knowledge and skill to do your job.',
    buttonContent: 'Update Licenses',
    redirectUrl: '/provider/profile/{pwid}#credentials',
    className: ''
  },
  {
    fieldName: 'offices',
    iconUrl: '/public/images/office.png',
    description:
      'While we strive for profile accuracy, the best source of information about you and your practice is YOU! Nothing is more frustrating than the wrong information. Make sure we got it right, and update whenever anything changes.',
    buttonContent: 'Update Office',
    redirectUrl: '/provider/profile/{pwid}#practice-locations',
    className: 'middle-section'
  },
  {
    fieldName: 'affiliatedhospitals',
    iconUrl: '/public/images/affiliatedhospitals.png',
    description:
      'Hospital quality matters, especially when a procedure requires a hospital stay. Patients are searching for hospitals now more than ever. Now is a great time to list all the hospitals you work for or are affiliated with.',
    buttonContent: 'Update AffiliatedHospitals',
    redirectUrl: '/provider/profile/{pwid}#hospitals',
    className: ''
  },
  {
    fieldName: 'education',
    iconUrl: '/public/images/education.png',
    description:
      'Show off those hard-earned degrees! Even though patients may not know exactly what goes into medical school, they do like to see your medical school, residency and any certifications you’ve completed to get a full idea of your education.',
    buttonContent: 'Update Education',
    redirectUrl: '/provider/profile/{pwid}#education',
    className: ''
  }
];

// States Options
export const stateOptions = [
  { value: 'Select State', label: 'Select State' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];

// Role options
export const roleOptions = [
  { label: '-', value: '' },
  {
    label: 'Physician or Provider',
    value: 'provider_-_i_am_a_provider_looking_for_assistance_with_my_profile_or_account.'
  },
  {
    label: 'Practice Administrator',
    value:
      'administrator_-_i_am_an_administrator_looking_for_help_with_my_providers__profiles_or_my_account.'
  },
  {
    label: 'Health System or Hospital Representative',
    value:
      'healthcare_partners_-_i_am_looking_for_information_about_healthgrades_solution_for_health_systems.'
  }
];

//Client-portal-Admin Role
export const adminRoles = [
  { label: 'Select Admin Role', value: '-' },
  {
    label: 'Roster User',
    value: 'Roster'
  },
  {
    label: 'Client Admin',
    value: 'Client_Admin'
  },
  {
    label: 'HG Internal Admin',
    value: 'HG_Admin'
  }
];

//Header columns for Client-Portal
export const headerColumnsClientPortal = [
  {
    ColumnName: 'Provider Name',
    IsSortBy: true,
    ClassName: 'provider-search name',
    IsSorted: true,
    isShow: true
  },
  {
    ColumnName: 'Type/ ID',
    IsSortBy: false,
    ClassName: 'provider-search type-id',
    IsSorted: false,
    isShow: false
  },
  {
    ColumnName: 'Practice/ Office',
    IsSortBy: false,
    ClassName: 'provider-search practice-office',
    IsSorted: false,
    isShow: false
  },
  {
    ColumnName: 'Profile Completeness',
    IsSortBy: false,
    ClassName: 'provider-search profile-completeness',
    IsSorted: false,
    isShow: true
  },
  {
    ColumnName: 'Profile Views',
    IsSortBy: false,
    ClassName: 'provider-search profile-views',
    IsSorted: false,
    isShow: true
  },
  {
    ColumnName: 'Last Accessed By',
    IsSortBy: false,
    ClassName: 'provider-search last-accessed-by',
    IsSorted: false,
    isShow: true
  }
];

export const clientPortalClientCodes = [
  {
    label: 'Adena Health System',

    value: 'ADHS-PDCHSP'
  },

  {
    label: 'ADPI',

    value: 'ADPI-MAP'
  },

  {
    label: 'AdventHealth',

    value: 'AHOR-PDCHSP'
  },

  {
    label: 'Archenia',

    value: 'ARCH-PDCPRACT2'
  },

  {
    label: 'American Vision Partners',

    value: 'AVP-MAP'
  }
];

//Header columns for Client-Portal
export const radioOptionsforAdding = [
  {
    Name: 'NPI',
    Value: 'npi',
    Show: true
  },
  {
    Name: 'PWID',
    Value: 'pwid',
    Show: true
  }
];
//Header columns for Client-Portal Designation
export const headerColumnsCPDesignation = [
  {
    ColumnName: 'Provider Name',
    IsSortBy: true,
    ClassName: 'provider-search name',
    IsSorted: true,
    isShow: true
  },
  {
    ColumnName: 'Practice/ Office',
    IsSortBy: false,
    ClassName: 'provider-search practice-office',
    IsSorted: false,
    isShow: false
  },
  {
    ColumnName: 'Employement Type',
    IsSortBy: false,
    ClassName: 'provider-search employement-type',
    IsSorted: false,
    isShow: true
  }
];

//Client-portal-Client Code
export const clientCode = [
  { label: 'Client Code', value: '-' },
  {
    label: 'ABCD',
    value: 'ABCD'
  },
  {
    label: 'PQRS',
    value: 'PQRS'
  },
  {
    label: 'CDEF',
    value: 'CDEF'
  }
];

export const batchEditOptions = [
  {
    Name: 'Hospitals',
    Value: 'hospitals'
  },
  {
    Name: 'Conditions',
    Value: 'conditions'
  },
  {
    Name: 'Designation',
    Value: 'designation'
  },
  {
    Name: 'Insurance',
    Value: 'insurance'
  },
  {
    Name: 'Photos',
    Value: 'photos'
  },
  {
    Name: '',
    Value: ''
  },
  {
    Name: 'Procedures',
    Value: 'procedures'
  },
  {
    Name: 'Specialty',
    Value: 'specialties'
  }
];
//Menu section -- For future tabs in menu-bar here it can be added
export const menuSections = [
  // {
  //   displayName: 'Login',
  //   tabName: 'login',
  //   selected: true,
  // },
];
