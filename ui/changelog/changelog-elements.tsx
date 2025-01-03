import ChangelogEl from './changelog-element';
import HomepageChangelogEl from './homepage-changelog-element'

const versions = {
  "0.14.0": {
    "date": "12/31/24",
    "changes": "Added a blurred background to much of the site's UI",
    "type": "convoes"
  },
  "0.13.0": {
    "date": "12/31/24",
    "changes": "Added a roadmap",
    "type": "convoes"
  },
  "0.12.1": {
    "date": "12/27/24",
    "changes": "Adjusted the strength of the \"See More\" button",
    "type": "convoes"
  },
  "0.12.0": {
    "date": "12/26/24",
    "changes": "Added a \"See More\" button to the descriptions",
    "type": "convoes"
  },
  "0.11.1": {
    "date": "12/25/24",
    "changes": "Fixed alert text and a bug in compilation",
    "type": "convoes"
  },
  "0.11.0": {
    "date": "12/25/24",
    "changes": "Added the ability to change your description",
    "type": "convoes"
  },
  "0.10.1": {
    "date": "12/23/24",
    "changes": "Added sub-settings menu to be more detailed",
    "type": "convoes"
  },
  "0.10.0": {
    "date": "12/23/24",
    "changes": "Made the site display description rather than name",
    "type": "convoes"
  },
  "0.9.1": {
    "date": "12/22/24",
    "changes": "Made the background move slightly faster",
    "type": "convoes"
  },
  "0.9.0": {
    "date": "12/22/24",
    "changes": "Made the settings page display some text if you are not signed in and added webhook functionality",
    "type": "convoes"
  },
  "0.8.0": {
    "date": "12/22/24",
    "changes": "Changed the navbar to use icons rather than text",
    "type": "convoes"
  },
  "0.7.0": {
    "date": "12/22/24",
    "changes": "Added a settings page",
    "type": "convoes"
  },
  "0.6.1": {
    "date": "12/21/24",
    "changes": "Optimized the users page",
    "type": "convoes"
  },
  "0.6.0": {
    "date": "12/21/24",
    "changes": "Added Suspense to the users page",
    "type": "convoes"
  },
  "0.5.1": {
    "date": "12/21/24",
    "changes": "Made users to use an api so it actually would update",
    "type": "convoes"
  },
  "0.5.0": {
    "date": "12/21/24",
    "changes": "Made users update automatically on reload, fixed profile pictures and made myself always be the first one in the list",
    "type": "convoes"
  },
  "0.4.0": {
    "date": "12/21/24",
    "changes": "Added a fallback profile picture",
    "type": "convoes"
  },
  "0.3.0": {
    "date": "12/21/24",
    "changes": "Improved the all users page",
    "type": "convoes"
  },
  "0.2.0": {
    "date": "12/21/24",
    "changes": "Added an all users page",
    "type": "convoes"
  },
  "0.1.4": {
    "date": "12/21/24",
    "changes": "Slightly improved compatibility",
    "type": "convoes"
  },
  "0.1.3": {
    "date": "12/20/24",
    "changes": "Brought the version name to the bottom and added the most recent changelog element to the first page",
    "type": "convoes"
  },
  "0.1.2": {
    "date": "12/20/24",
    "changes": "Added the version name",
    "type": "convoes"
  },
  "0.1.1": {
    "date": "12/20/24",
    "changes": "Added a changelog",
    "type": "convoes"
  }
}

//----------------------------------------------------

export function LatestChangeElement() {
  // Get the first key from the versions object
  const firstKey = Object.keys(versions)[0];
  
  if (!firstKey) {
    return <p>No changelog available.</p>; // Handle the case where the versions object is empty
  }

  const firstItem = versions[firstKey as keyof typeof versions];

  return (
    <HomepageChangelogEl
      vername={firstKey}
      date={firstItem.date}
      changes={firstItem.changes}
      changeType={firstItem.type}
    />
  );
}

//-----------------------------------------------------

  

export default function ChangelogElements() {
  return(
    <>
      <div className='p-2'>
        {Object.keys(versions).map((key) => {
          const vername = key as keyof typeof versions;
          const changes = versions[vername].changes;
          const date = versions[vername].date;
          const changeType = versions[vername].type;

          return (
            <ChangelogEl
              key={vername}
              vername={vername}
              date={date}
              changes={changes}
              changeType={changeType}
            />
          );
        })}
      </div>
    </>
   
    );
}


    