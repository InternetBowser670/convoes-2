import ChangelogEl from './changelog-element';
import HomepageChangelogEl from './homepage-changelog-element'

const versions = {
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


    