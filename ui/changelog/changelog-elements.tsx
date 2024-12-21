import ChangelogEl from './changelog-element';
import HomepageChangelogEl from './homepage-changelog-element'

const versions = {
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


    