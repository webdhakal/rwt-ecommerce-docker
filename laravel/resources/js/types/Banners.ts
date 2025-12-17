

export interface  Banner {
    id: string;
    initials: string;
    name: string;
    sub_title: string;
    description: string;
    link: string;
    status: string;
    files: Files;
}


interface Files {
  id: string;
  file_name: string;
  original_name: string;
  mime_type: string;
  custom_properties: any[];
  generated_conversions: any[];
  url: string;
  collection_name: string;
}

export interface BannerProps {
    banners: Banner[];
    onSelectBanner: (bannerId: number) => void;
}
 
