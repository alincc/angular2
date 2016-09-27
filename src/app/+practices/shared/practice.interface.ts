import {LocationInterface} from '../../shared'

export interface practiceInterface{
  id?: number;
  name: string;
  physical_address?: string;
  phone?: string;
  mobile_phone?: string;
  email?: string;
  services?: string[];
  photos?: string[];
  overview?: string,
  geo_location?: LocationInterface;
  ch_url?: string;
  facebook_page?: string;
  website?: string;
}
