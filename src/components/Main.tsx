import React, { useState, useEffect } from 'react';
import { Teaser, Person } from '../types/rocketReachTypes';
import { Database } from '../types/supabaseTypes';
import { LinkedInJob } from '../types/Jobs';
import '../main.css';

import { Oval } from 'react-loader-spinner';
import { FaCheck } from 'react-icons/fa6';
import { FaSave } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';

// Get contact type
type Contact = Database['public']['Tables']['contacts']['Insert'];

type ProfileCardProps = {
  userId: string;
  accessToken: string;
  person: Person;
};

const ProfileCard = ({ person, userId, accessToken }: ProfileCardProps) => {
  // Send contact to database
  const sendContact = async (person: Person) => {
    let contact;
    if (person.id) {
      contact = {
        id: person.id,
        full_name: person.name,
        occupation: person.current_title,
        // company: person.current_employer,
        // location: person.location,
        contact_saved_by: userId,
      };
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contacts-crud`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(contact),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const savePerson = () => {
    sendContact(person);
    // Implement save logic here
  };

  const messagePerson = () => {
    // Click on write message box
    // ID for pen button was dynamic so have to grab container around it first; For example,
    // document.getElementById('ember41')?.click(); would sometimes be ember40
    const messageButtonContainer = document.getElementsByClassName(
      'msg-overlay-bubble-header__controls'
    )[0];

    // Need to assert type because Element type does not have a click() method
    const writeMessageButton = messageButtonContainer
      .children[1] as HTMLButtonElement;
    writeMessageButton.click();

    // Wait for message box to appear
    setTimeout(() => {
      // Search user by name and company; need to grab input field first
      const searchContainer = document.getElementsByClassName(
        'msg-connections-typeahead__top-fixed-section'
      )[0];

      // Just another div not sure what to call it
      const subSearchContainer = searchContainer?.children[0];

      // Input field to search for someone
      const userSearchInputField = subSearchContainer
        ?.children[0] as HTMLInputElement;

      // Search for someone by name and company
      userSearchInputField.focus();

      // Simulate typing into the input field
      const nativeInputValueSetter = (
        Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        ) as PropertyDescriptor
      )?.set;
      nativeInputValueSetter?.call(userSearchInputField, `${person.name}`);

      // Dispatch input event to trigger any attached event listeners
      const inputEvent = new Event('input', { bubbles: true });
      userSearchInputField.dispatchEvent(inputEvent);

      const enterKeyEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13, // Deprecated but included for compatibility with older browsers
        which: 13, // Deprecated but included for compatibility with older browsers
        bubbles: true, // Event will bubble up through the DOM
        cancelable: true, // Event can be canceled
      });

      userSearchInputField.dispatchEvent(enterKeyEvent);
    }, 500);

    // let userSearchInputField = document.getElementById('ember439-search-field');

    // if (userSearchInputField) {
    //     console.log('hi')
    //     userSearchInputField.textContent = `${person.name} ${person.current_employer}`;

    //     // To hit enter?
    //     const enterKeyEvent = new KeyboardEvent('keydown', {
    //         key: 'Enter',
    //         code: 'Enter',
    //         keyCode: 13, // Deprecated but included for compatibility with older browsers
    //         which: 13, // Deprecated but included for compatibility with older browsers
    //         bubbles: true, // Event will bubble up through the DOM
    //         cancelable: true // Event can be canceled
    //     });

    //     userSearchInputField.dispatchEvent(enterKeyEvent);
    // }

    // Implement message logic here
  };

  return (
    <div className="profile-card">
      <img src={person.profile_pic} alt={person.name} className="profile-pic" />
      <div className="profile-info">
        <a
          href={person.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-name-link"
        >
          <h4 className="profile-name">{person.name}</h4>
        </a>
        <p className="profile-occupation">{person.current_title}</p>
        <p className="profile-location">{`${person.location}`}</p>
      </div>
      <div className="profile-actions">
        <button className="profile-action-button" onClick={savePerson}>
          <FaSave />
        </button>
        <button className="profile-action-button" onClick={messagePerson}>
          <AiOutlineMessage />
        </button>
      </div>
    </div>
  );
};

type MainProps = {
  linkedInJob: LinkedInJob | null;
  userId: string;
  accessToken: string;
};

const Main = ({ linkedInJob, userId, accessToken }: MainProps) => {
  let jobTitle = '';
  let companyName = '';
  let companyUrl = '';

  if (linkedInJob) {
    jobTitle = linkedInJob.jobTitle;
    companyName = linkedInJob.companyName;
    companyUrl = linkedInJob.companyUrl;
  }

  const [peopleLoading, setPeopleLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [jobSaving, setJobSaving] = useState(false);
  const [jobSaved, setJobSaved] = useState(false);

  // Send job to database
  const sendJob = async (
    userId: string,
    accessToken: string,
    position: string
  ) => {
    setJobSaving(true);
    await fetch(
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
    ).then((response) => {
      // Need to error handle here
      if (response.ok) {
        setJobSaving(false);
        setJobSaved(true);
      }
      return response.json();
    });
  };

  // Fetch people based on job
  const fetchPeople = async () => {
    setPeopleLoading(true);
    const query = { keyword: [companyName] };
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rreach-employees`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(query),
      }
    );
    const data = await response.json();
    console.log(data);
    setPeople(data.profiles);
    setPeopleLoading(false);
  };

  // Reset people
  useEffect(() => {
    setPeople([]);
  }, [linkedInJob]);

  return (
    <>
      {linkedInJob ? (
        <div className="wrapper">
          <div className="job-container">
            <div className="job-header">
              <h2 className="job-title">{jobTitle}</h2>
              <h2 className="company-name">{companyName}</h2>
            </div>
            <div className="button-container">
              <div
                className="save-button"
                onClick={() => sendJob(userId, accessToken, jobTitle)}
              >
                {jobSaving ? (
                  <Oval color="#fff" height={20} width={20} />
                ) : jobSaved ? (
                  <FaCheck />
                ) : (
                  'Save Job'
                )}
              </div>
              <div className="find-people-button" onClick={fetchPeople}>
                Find People
              </div>
            </div>
          </div>
          <div className="people-container">
            <div className="people-container">
              {/* <h3>Reach out to:</h3> */}
              <div className="profile-list">
                {peopleLoading ? (
                  <p>Loading...</p>
                ) : (
                  people.map((person) => (
                    <ProfileCard
                      key={person.id}
                      person={person}
                      userId={userId}
                      accessToken={accessToken}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="job-container">
            <div className="job-header">
              <h2 className="job-title">Job goes here</h2>
              <h2 className="company-name">Company goes here</h2>
            </div>
            <div className="button-container">
              <div
                className="save-button"
                onClick={() => console.log('Job not needed')}
              >
                Save job
              </div>
              <div
                className="find-people-button"
                onClick={() => console.log('Cannot fetch people')}
              >
                Find People
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
