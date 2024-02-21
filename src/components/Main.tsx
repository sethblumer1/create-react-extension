import React, { useState, useEffect } from 'react';
import { Teaser, Person } from '../types/rocketReachTypes';
import { LinkedInJob } from '../types/Jobs';
import '../main.css';

type ProfileCardProps = {
    person: Person;
};

const ProfileCard = ({ person }: ProfileCardProps) => {
    return (
        <div className="profile-card">
            <img
                src={person.profile_pic}
                alt={person.name}
                className="profile-pic"
            />
            <div className="profile-info">
                <h4 className="profile-name">{person.name}</h4>
                <p className="profile-occupation">{person.current_title}</p>
                <p className="profile-location">{`${person.city}, ${person.region}`}</p>
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

type MainProps = {
    linkedInJob: LinkedInJob;
    userId: string;
    accessToken: string;
}

const Main = ({
    linkedInJob,
    userId,
    accessToken,
}: MainProps) => {
    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState<Person[]>([]);
    const { jobTitle, companyName, companyUrl } = linkedInJob;

    // Fetch people based on job
    const fetchPeople = async () => {
        setLoading(true);
        const query = { "keyword": [companyName] }
        const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL
            }/functions/v1/rreach-employees`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(query)
            }
        );
        const data = await response.json();
        console.log(data);
        setPeople(data.profiles);
        setLoading(false);
    };

    // Reset people
    useEffect(() => {
        setPeople([]);
    }, [linkedInJob])

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
                <div className="people-container">
                    {/* <h3>Reach out to:</h3> */}
                    <div className="profile-list">
                        {loading ? <p>Loading...</p> : people.map(person => (
                            <ProfileCard key={person.id} person={person} />
                        ))}
                    </div>
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
