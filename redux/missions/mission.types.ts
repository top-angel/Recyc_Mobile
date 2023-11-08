/* eslint-disable prettier/prettier */

export interface MissionDoc {
    bounty_description: string;
    bounty_image_url: string;
    bounty_name: string;
    company_description: string;
    company_image_url: string;
    company_name: string;
    end_date: string;
    id: string;
    start_date: string;
    sample_data_list: string[];
    entity_list_id: string;
    tags: string[];
    image_count: number;
    image_format: string[];
    image_requirements: string;
    number_of_verifications: number;
    bounty_type: string;
    total_entity_count: number;
    rejected_entity_count: number;
    accepted_entity_count: number;
    number_of_annotations: number;
    imageBase64: string;
    imageName: string;
}

export interface MissionPartialDoc {
    criteria: {
        target: number;
    };
    description: string;
    bounty_id: string;
    id: string;
    image: string;
    level: number;
    reward_status: string;
    progress: number;
    status: string;
    title: string;
    type: string;
    end_date: string;
    imageBase64?: string;
    imageName?: string;
}

export interface MisssionClaimDoc {
    missionId: string;
    bountyId: string;
    bountyName: string;
    companyName: string;
    startDate: string;
    endDate: string;
}
