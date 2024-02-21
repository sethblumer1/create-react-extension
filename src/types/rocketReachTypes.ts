export type Teaser = {
    emails?: string[];
    phones?: {
        number: string;
        is_premium: boolean;
    }[];
    preview?: any[];
    is_premium_phone_available?: boolean;
    personal_emails?: string[];
    professional_emails?: string[];
};

export type Person = {
    id?: number;
    status?: string;
    name?: string;
    profile_pic?: string;
    links?: null;
    linkedin_url?: string;
    location?: string;
    city?: string;
    region?: string;
    country?: string;
    country_code?: string;
    current_title?: string;
    current_employer?: string;
    current_employer_domain?: string;
    current_employer_website?: string;
    teaser?: Teaser;
    birth_year?: number;
    current_employer_id?: number;
    current_employer_linkedin_url?: string;
    region_latitude?: number;
    region_longitude?: number;
    suppressed?: boolean;
};