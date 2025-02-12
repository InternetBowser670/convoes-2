import ChangelogEl from './changelog-element';
import HomepageChangelogEl from './homepage-changelog-element'

const versions = {
  "1.0.5": {
    "date": "2/7/25",
    "changes": "Made messages be displayed in the order that they were sent, rather than the order that they were recieved at",
    "type": "convoes"
  },
  "1.0.4": {
    "date": "1/27/25",
    "changes": "Fixed a problem with the chat box not scrolling down properly",
    "type": "convoes"
  },
  "1.0.3": {
    "date": "1/27/25",
    "changes": "Made messages appear to become visible as soon as you send them",
    "type": "convoes"
  },
  "1.0.2": {
    "date": "1/25/25",
    "changes": "Made the chat box only scroll down when there is a new message",
    "type": "convoes"
  },
  "1.0.1": {
    "date": "1/24/25",
    "changes": "Refactored the code so that the database uses a singleton, reducing the amount of connections that I have to make",
    "type": "convoes"
  },
  "1.0.0": {
    "date": "1/22/25",
    "changes": "Made Convoes update automatically",
    "type": "convoes"
  },
  "0.26.0": {
    "date": "1/22/25",
    "changes": "Added a button to update the messages",
    "type": "convoes"
  },
  "0.25.0": {
    "date": "1/21/25",
    "changes": "Added the ability to send messages",
    "type": "convoes"
  },
  "0.24.0": {
    "date": "1/21/25",
    "changes": "Added the ability for Convoes to display text messages",
    "type": "convoes"
  },
  "0.23.0": {
    "date": "1/18/25",
    "changes": "Added a box to each Convo that displays its content",
    "type": "convoes"
  },
  "0.22.3": {
    "date": "1/18/25",
    "changes": "Made the dashboard display some information if you are not signed in",
    "type": "convoes"
  },
  "0.22.2": {
    "date": "1/17/25",
    "changes": "Fixed a bug with the all chats page",
    "type": "convoes"
  },
  "0.22.1": {
    "date": "1/17/25",
    "changes": "Fixed auth bug",
    "type": "convoes"
  },
  "0.22.0": {
    "date": "1/17/25",
    "changes": "Made the dashboard sort by users added",
    "type": "convoes"
  },
  "0.21.0": {
    "date": "1/17/25",
    "changes": "Added pages for each Convo",
    "type": "convoes"
  },
  "0.20.1": {
    "date": "1/17/25",
    "changes": "Made the dashboard not show a private chats if you do not have any on your account",
    "type": "convoes"
  },
  "0.20.0": {
    "date": "1/16/25",
    "changes": "Added a dashboard",
    "type": "convoes"
  },
  "0.19.0": {
    "date": "1/14/25",
    "changes": "Made the /allchats page automatically fetch data at an interval",
    "type": "convoes"
  },
  "0.18.1": {
    "date": "1/14/25",
    "changes": "Fixed a bug with the /allusers page where it would throw an error if you are not signed in",
    "type": "convoes"
  },
  "0.18.0": {
    "date": "1/13/25",
    "changes": "Made the donate link refer to https://www.buymeacoffee.com/internetbowser",
    "type": "convoes"
  },
  "0.17.0": {
    "date": "1/12/25",
    "changes": "The global Convoes page now shows which Convoes you are in",
    "type": "convoes"
  },
  "0.16.0": {
    "date": "1/11/25",
    "changes": "Added the ability to join Convoes",
    "type": "convoes"
  },
  "0.15.6": {
    "date": "1/11/25",
    "changes": "Updated README.md",
    "type": "convoes"
  },
  "0.15.5": {
    "date": "1/10/25",
    "changes": "Made chats all use the same db collection again (will help for later)",
    "type": "convoes"
  },
  "0.15.4": {
    "date": "1/9/25",
    "changes": "Patched another small problem with MongoDB where Mongo connections don't automatically close",
    "type": "convoes"
  },
  "0.15.3": {
    "date": "1/9/25",
    "changes": "Patched another small problem with the Convoes navbar tooltip and made the cutoff for chat descriptions and names shorter",
    "type": "convoes"
  },
  "0.15.2": {
    "date": "1/8/25",
    "changes": "Patched a small problem with the Convoes navbar tooltip and fixed the roadmap font",
    "type": "convoes"
  },
  "0.15.1": {
    "date": "1/7/25",
    "changes": "Patched a small problem with creating convoes",
    "type": "convoes"
  },
  "0.15.0": {
    "date": "1/7/25",
    "changes": "Added the ability to create convoes",
    "type": "convoes"
  },
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


    