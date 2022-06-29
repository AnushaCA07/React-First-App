import React from 'react';
import AuditCard from '../AuditCard';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../.storybook/store';

const removeAuditProviderCard = (auditId) => {};
const auditCard = {
  ProviderAddress: '7480 Ziegler Rd, Chattanooga, TN 37421',
  Type: 'Sponsored',
  AuditId: 567721,
  Pwid: 'YLV2V',
  Status: 'READY',
  ProviderFullName: 'Dr. Robert  Mastey, MD',
  ClientName: '',
  UserName: 'pollyreese@hgweb.com',
  AuditedByUsername: null,
  SubmittedByFullName: 'Polly Reese',
  LastModifiedDate: '2019-08-20T01:45:40.383',
  LastModifiedDateString: 'Thu, Aug 20, 2020',
  LastModifiedTimeString: '01:45 pm',
  LastContactedDate: null,
  ProfileManagerAuditRecord: {
    AuditSection: [
      {
        Id: '8818fd9c-2d34-4de2-9925-42c604396ba6',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Name - first_name',
        Items: [
          {
            Id: '8818fd9c-2d34-4de2-9925-42c604396ba6',
            ItemId: null,
            IsProcessed: false,
            OriginalValue: 'Robert',
            ProposedValue: 'Robertt',
            ActionTaken: null,
            Status: null,
            SectionName: 'Name - first_name',
            RequestedDate: '9/3/2020 5:10:03 AM',
            RequestedBy: 'kgannonjedi+ref1025t@gmail.com',
            RequestedByFullName: 'Yug Gawai',
            RequesterEmail: 'gawai5@hgweb.com',
            JoinedAuditItemId: null,
            ProposedEmailValue: null,
            AuditId: 54385,
          },
          {
            Id: '9918fd9c-2d34-4de2-9925-42c6043944c5',
            ItemId: null,
            IsProcessed: false,
            OriginalValue: 'Mr',
            ProposedValue: 'Mr III',
            ActionTaken: null,
            Status: null,
            SectionName: 'Name - suffix',
            RequestedDate: '9/3/2020 5:10:03 AM',
            RequestedBy: 'kgannonjedi+ref1025t@gmail.com',
            JoinedAuditItemId: null,
            ProposedEmailValue: null,
            AuditId: 54393,
          },
        ],
        JoinedAudtItem: null,
      },
      {
        Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Name - last_name',
        Items: [
          {
            Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
            ItemId: null,
            IsProcessed: false,
            OriginalValue: 'Mastey',
            ProposedValue: 'Last',
            ActionTaken: null,
            Status: null,
            SectionName: 'Name - last_name',
            RequestedDate: '9/3/2020 5:10:03 AM',
            RequestedBy: 'kgannonjedi+ref1025t@gmail.com',
            JoinedAuditItemId: null,
            ProposedEmailValue: null,
            AuditId: 54395,
          },
        ],
        JoinedAudtItem: null,
      },

      {
        Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Biography',
        Items: [
          {
            Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
            ItemId: null,
            IsProcessed: false,
            OriginalValue: '',
            ProposedValue: 'Deleted',
            ActionTaken: null,
            Status: null,
            SectionName: 'Biography',
            RequestedDate: '9/3/2020 5:10:03 AM',
            RequestedBy: 'kgannonjedi+ref1025t@gmail.com',
            JoinedAuditItemId: null,
            ProposedEmailValue: null,
            AuditId: 54392,
          },
        ],
        JoinedAudtItem: null,
      },

      {
        Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Biography',
        Items: [
          {
            Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
            ItemId: null,
            IsProcessed: false,
            OriginalValue: 'Title: About cindi',
            ProposedValue:
              'Title :About Cindi Rife Test Profile...just making it longer',
            ActionTaken: null,
            Status: null,
            SectionName: 'Biography',
            RequestedDate: '9/3/2020 5:10:03 AM',
            RequestedBy: 'kgannonjedi+ref1025t@gmail.com',
            JoinedAuditItemId: null,
            ProposedEmailValue: null,
            AuditId: 543922,
          },
        ],
        JoinedAudtItem: null,
      },

      {
        Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Care Philosophy',
        Items: [
          {
            Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
            ItemId: null,
            IsProcessed: false,
            OriginalValue: 'Title: About cindi',
            ProposedValue:
              '<p>Dr. Cindi Rife, MD is a psychiatry doctor who practices in Upland, PA. He has been practicing for 11 years. Dr. Glushakow is affiliated with Delaware County Memorial Hospital, Crozer - Chester Medical Center, Rife Hospital and Springfield Hospital.</p><p>Dr. Cindi Rife, MD is a psychiatry doctor who practices in Upland, PA. He has been practicing for 11 years. Dr. Glushakow is affiliated with Delaware County Memorial Hospital, Crozer - Chester Medical Center, Rife Hospital and Springfield Hospital.</p>',
            ActionTaken: null,
            Status: null,
            SectionName: 'Care Philosophy',
            RequestedDate: '9/3/2020 5:10:03 AM',
            RequestedBy: 'kgannonjedi+ref1025t@gmail.com',
            JoinedAuditItemId: null,
            ProposedEmailValue: null,
            AuditId: 54332,
          },
        ],
        JoinedAudtItem: null,
      },

      {
        Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Response to Patient Satisfaction Surveys',
        Items: [
          {
            Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
            ItemId: null,
            IsProcessed: false,
            OriginalValue: 'testing 123',
            ProposedValue: 'Deleted',
            ActionTaken: null,
            Status: null,
            SectionName: 'Response to Patient Satisfaction Surveys',
            RequestedDate: '9/3/2020 5:10:03 AM',
            RequestedBy: 'kgannonjedi+ref1025t@gmail.com',
            JoinedAuditItemId: null,
            ProposedEmailValue: null,
            AuditId: 54366,
          },
        ],
        JoinedAudtItem: null,
      },

      {
        Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Response to Patient Satisfaction Surveys',
        Items: [
          {
            Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
            ItemId: null,
            IsProcessed: false,
            OriginalValue: '',
            ProposedValue: 'Test Response',
            ActionTaken: null,
            Status: null,
            SectionName: 'Response to Patient Satisfaction Surveys',
            RequestedDate: '9/3/2020 5:10:03 AM',
            RequestedBy: 'kgannonjedi+ref1025t@gmail.com',
            JoinedAuditItemId: null,
            ProposedEmailValue: null,
            AuditId: 54376,
          },
        ],
        JoinedAudtItem: null,
      },

      {
        Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Office',
        Items: [
          {
            Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
            ItemId: null,
            IsProcessed: false,
            OriginalValue:
              '<p>Practice: Ochsner Health Center - Summa (Bluebonnet Blvd)<br>Office: Ochsner Health Center - Summa<br>9001 Summa Ave <br>Baton Rouge, LA 70809<br>Phone (225) 761-5200<br>Fax (330) 688-1278<br/>Users Affected: hgmd:AUDIT<br/></p>',
            ProposedValue: 'Test Response',
            ActionTaken: null,
            Status: null,
            SectionName: 'Office',
            RequestedDate: '9/3/2020 5:10:03 AM',
            RequestedBy: 'kgannonjedi+ref1025t@gmail.com',
            JoinedAuditItemId: null,
            ProposedEmailValue: null,
            AuditId: 54464,
          },
        ],
        JoinedAudtItem: null,
      },

      {
        Id: '1a0559a4-0375-4ad1-a75e-a215ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Photo',
        Items: [
          {
            ItemId: null,
            IsProcessed: false,
            OriginalValue:
              'http://d1ffafozi03i4l.cloudfront.net/img/silhouettes/silhouette-female_w120h160_v1.jpg',
            ProposedValue:
              'http://d1ffafozi03i4l.cloudfront.net/img/silhouettes/silhouette-female_w120h160_v1.jpg',
            ActionTaken: null,
            Status: null,
            SectionName: 'Photo',
            AuditId: 54342,
          },
        ],
        JoinedAudtItem: null,
      },
      {
        Id: '1a0559a4-0375-4ad1-fr4e-c415ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Video',
        Items: [
          {
            ItemId: null,
            IsProcessed: false,
            OriginalValue:
              'https://d2074hyx2donso.cloudfront.net/videos/XYLTS6V/01f53e4a40444e978f6d355f238b42c1.mp4',
            ProposedValue:
              'https://d2074hyx2donso.cloudfront.net/videos/XYLTS6V/01f53e4a40444e978f6d355f238b42c1.mp4',
            ActionTaken: null,
            Status: null,
            SectionName: 'Video',
            AuditId: 54345,
            VideoDetails: {
              VideoTranscript: null,
              ModerationResult: null,
              VideoHostCode: 'BRIGHTSPOT',
            },
          },
        ],
        JoinedAudtItem: null,
      },
      {
        Id: '1a0559a4-0375-4ad1-a75e-c415ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Video',
        Items: [
          {
            ItemId: null,
            IsProcessed: false,
            OriginalValue:
              'https://d2074hyx2donso.cloudfront.net/videos/XYLTS6V/01f53e4a40444e978f6d355f238b42c1.mp4',
            ProposedValue:
              'https://d2074hyx2donso.cloudfront.net/videos/XYLTS6V/01f53e4a40444e978f6d355f238b42c1.mp4',
            ActionTaken: null,
            Status: null,
            SectionName: 'Video',
            AuditId: 54342,
            VideoDetails: {
              VideoTranscript:
                "Where's friend free? She's at the tower with your little friend Marie Elka. She gave us a message to pass on to you. You have to choose the lesser evil. It's an ultimatum, get it, mm. Mhm. Yeah. Mhm. Okay. Mhm. Uh huh. Yeah. Yeah.",
            },
          },
        ],
        JoinedAudtItem: null,
      },
      {
        Id: '1a0559a4-0375-4ad1-a75e-a665ab4dd62f',
        Pwid: 'YLV2V',
        IsProcessed: false,
        SectionName: 'Video',
        Items: [
          {
            ItemId: null,
            IsProcessed: false,
            OriginalValue:
              'https://testaws.healthgrades.com/video/00000153-8588-d304-afdf-ddec91bb0000',
            ProposedValue:
              'https://d2074hyx2donso.cloudfront.net/videos/XYLTS6V/01f53e4a40444e978f6d355f238b42c1.mp4',
            ActionTaken: null,
            Status: null,
            SectionName: 'Video',
            AuditId: 54362,
            VideoDetails: {
              ModerationResult: [
                {
                  ModerationLabelName: 'Violence',
                  Timestamp: 5999,
                },
                {
                  ModerationLabelName: 'Weapon Violence',
                  Timestamp: 6499,
                },
                {
                  ModerationLabelName: 'Violence',
                  Timestamp: 25066,
                },
                {
                  ModerationLabelName: 'Weapon',
                  Timestamp: 25566,
                },
                {
                  ModerationLabelName: 'Violence',
                  Timestamp: 26066,
                },
                {
                  ModerationLabelName: 'Weapon',
                  Timestamp: 26566,
                },
                {
                  ModerationLabelName: 'Violence',
                  Timestamp: 27066,
                },
                {
                  ModerationLabelName: 'Weapons',
                  Timestamp: 27566,
                },
                {
                  ModerationLabelName: 'Weapon Violence',
                  Timestamp: 37566,
                },
                {
                  ModerationLabelName: 'Weapon Violence',
                  Timestamp: 38400,
                },
              ],
              VideoTranscript:
                "Where's friend free? She's at the tower with your little friend Marie Elka. She gave us a message to pass on to you. You have to choose the lesser evil. It's an ultimatum, get it, mm. Mhm. Yeah. Mhm. Okay. Mhm. Uh huh. Yeah. Yeah.",
              VideoHostCode: 'BRIGHTSPOT',
            },
          },
        ],
        JoinedAudtItem: null,
      },
    ],
    Total: 0,
    HasOneAcceptedAddress: false,
    HasAboutMeAudit: false,
    HasFacilityAudit: false,
  },
  removeAuditProviderCard,
};
storiesOf('AuditCard', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('AuditCard', () => <AuditCard {...auditCard} />);
