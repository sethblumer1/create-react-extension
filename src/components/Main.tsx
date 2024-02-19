import React, { useState, useEffect } from 'react';
import '../main.css';

interface ProfileObject {
    profile_url: string;
    profile: {
        public_identifier: string;
        profile_pic_url: string;
        full_name: string;
        occupation: string;
        city: string;
        state: string;
    };
}

interface Person {
    profileUrl: string;
    publicIdentifier: string;
    profilePicUrl: string;
    fullName: string;
    occupation: string;
    city: string;
    state: string;
}

interface ProfileCardProps {
    person: Person;
}

interface Job {
    id?: number;
    position: string;
    company_id: string;
    user_id: string;
    job_status?: string;
}

interface MainProps {
    jobTitle: string;
    companyName: string;
    companyUrl: string;
    userId: string;
    accessToken: string;
}

const extractProfileData = (profiles: ProfileObject[]): Person[] =>
    profiles.map((profile) => ({
        profileUrl: profile.profile_url,
        publicIdentifier: profile.profile?.public_identifier,
        profilePicUrl: profile.profile?.profile_pic_url,
        fullName: profile.profile?.full_name,
        occupation: profile.profile?.occupation,
        city: profile.profile?.city,
        state: profile.profile?.state,
    }));

const ProfileCard = ({ person }: ProfileCardProps) => {
    return (
        <div className="profile-card">
            <img
                src={person.profilePicUrl}
                alt={person.fullName}
                className="profile-pic"
            />
            <div className="profile-info">
                <h4 className="profile-name">{person.fullName}</h4>
                <p className="profile-occupation">{person.occupation}</p>
                <p className="profile-location">{`${person.city}, ${person.state}`}</p>
            </div>
        </div>
    );
};

// Send job to database
const sendJob = async (
    userId: string,
    accessToken: string,
    position: string
) => {
    const response = await fetch(
        `https://tridvqtnafgvkszwhlcr.supabase.co/functions/v1/jobs-crud`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                position,
                company_id: 5,
                user_id: userId,
            }),
        }
    );
    return response.json();
};

const Main = ({
    jobTitle,
    companyName,
    companyUrl,
    userId,
    accessToken,
}: MainProps) => {
    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState<Person[]>([]);

    // Fetch people based on job
    const fetchPeople = async () => {
        setLoading(true);
        const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL
            }/functions/v1/company-employees?url=${companyUrl}&role_search=${jobTitle}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await response.json();
        console.log(data);
        setPeople(extractProfileData(data.employees));
        setLoading(false);
    };

    return (
        <div className="wrapper">
            <div className="job-container">
                <div className="job-header">
                    <h2 className="job-title">{jobTitle}</h2>
                    <h2 className="company-name">{companyName}</h2>
                </div>
                <div
                    className="save-button"
                    onClick={() => sendJob(userId, accessToken, jobTitle)}
                >
                    Save
                </div>
            </div>
            <div className="people-container">
                <div className="find-people-button" onClick={fetchPeople}>
                    Find People
                </div>
            </div>
        </div>
    );
};

export default Main;

{
    /* <div className="people-container">
                  <h3>Reach out to:</h3>
                  <div className="profile-list">
                      {loading ? <p>Loading...</p> : people.map(person => (
                          <ProfileCard key={person.publicIdentifier} person={person} />
                      ))}
                  </div>
              </div> */
}
