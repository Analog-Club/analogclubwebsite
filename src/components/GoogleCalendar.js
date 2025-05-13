import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;
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
        listMonthEvents();
      }).catch(err => {
        setError('Error initializing GAPI client: ' + err.message);
      });
    }

    async function listMonthEvents() {
      try {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const response = await window.gapi.client.calendar.events.list({
          'calendarId': CALENDAR_ID,
          'timeMin': firstDayOfMonth.toISOString(),
          'timeMax': lastDayOfMonth.toISOString(),
          'showDeleted': false,
          'singleEvents': true,
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