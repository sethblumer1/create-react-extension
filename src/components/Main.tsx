import React, { useState, useEffect } from 'react';
import "../main.css"

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


interface MainProps {
    jobTitle: string;
    companyName: string;
    companyUrl: string;
}

const extractProfileData = (profiles: ProfileObject[]): Person[] => (
    profiles.map(profile => ({
        profileUrl: profile.profile_url,
        publicIdentifier: profile.profile?.public_identifier,
        profilePicUrl: profile.profile?.profile_pic_url,
        fullName: profile.profile?.full_name,
        occupation: profile.profile?.occupation,
        city: profile.profile?.city,
        state: profile.profile?.state,
    }))
);

const ProfileCard = ({ person }: ProfileCardProps) => {
    return (
        <div className="profile-card">
            <img src={person.profilePicUrl} alt={person.fullName} className="profile-pic" />
            <div className="profile-info">
                <h4 className="profile-name">{person.fullName}</h4>
                <p className="profile-occupation">{person.occupation}</p>
                <p className="profile-location">{`${person.city}, ${person.state}`}</p>
            </div>
        </div>
    );
};

const Main = ({ jobTitle, companyName, companyUrl }: MainProps) => {
    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        const fetchPeople = async () => {
            setLoading(true);

            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/company-employees?url=${companyUrl}&role_search=${jobTitle}`, {
                headers: { 'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}` }
            });

            const data = await response.json();
            setPeople(extractProfileData(data.employees));
            setLoading(false);
        };

        if (companyName) {
            fetchPeople();
        }
    }, [companyName]);

    return (
        <div className="job-container">
            <div className="job-header">
                <h2 className="job-title">{jobTitle}</h2>
                <h2 className="company-name">{companyName}</h2>
            </div>
            <div className="people-container">
                <h3>Reach out to:</h3>
                <div className="profile-list">
                    {loading ? <p>Loading...</p> : people.map(person => (
                        <ProfileCard key={person.publicIdentifier} person={person} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Main;
