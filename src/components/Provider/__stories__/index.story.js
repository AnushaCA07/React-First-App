import React from "react";
import Provider from "../Provider";
import { storiesOf } from "@storybook/react";

const provider = {
  FirstName: "polly",
  LastName: "reese",
  DisplayName: "Polly A Reese",
  ProviderCode: "33l3g",
  NPI: "1678938",
  IsSponsored:true,
  SponsorName:"CommonSpirit Health",
  SponsorLocation:"Nevada",
  Office: {
    Name: "Central Maine Orthopaedics",
    AddressLine: "690 MINOT AVE",
    CityState: "STE 1 Auburn, ME 04210",
    Phone: "(222) 222-2222",
    Fax: "309) 620-8750"
  },
  PrimarySpecialty: {
    SpecialtyCode: "PS103",
    SpecialtyName: "Dentistry"
  }
};
storiesOf("Provider",module).add("Provider", () => <Provider {...provider} />);
