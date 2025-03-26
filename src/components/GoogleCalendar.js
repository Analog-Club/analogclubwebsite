import { useState, useEffect } from 'react';

// Get these from your environment variables
const API_KEY = 'AIzaSyA4mQRGc8OjNBsPQnsCLtSvFw1vtT89zZg';
const CALENDAR_ID = 'c_6c3850e7df7bdb6caa9d99dfae53478904a0baeaf467cb693aa733d31b4c23d4@group.calendar.google.com';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

export function useGoogleCalendar() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    function initializeGapiClient() {
      window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      }).then(() => {
        listUpcomingEvents();
      }).catch(err => {
        setError('Error initializing GAPI client: ' + err.message);
      });
    }

    async function listUpcomingEvents() {
      try {
        const response = await window.gapi.client.calendar.events.list({
          'calendarId': CALENDAR_ID,
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime',
        });

        const calendarEvents = response.result.items;
        setEvents(calendarEvents);
      } catch (err) {
        setError('Error: ' + err.message);
      }
    }

    // Load the Google API client
    if (window.gapi) {
      window.gapi.load('client', initializeGapiClient);
    } else {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => window.gapi.load('client', initializeGapiClient);
      script.onerror = () => setError('Failed to load Google API client');
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return { events, error };
}

export default useGoogleCalendar;