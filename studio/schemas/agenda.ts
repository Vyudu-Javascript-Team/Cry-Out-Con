export default {
    name: 'agenda',
    title: 'Agenda',
    type: 'document',
    fields: [
      {
        name: 'announcement',
        title: 'Announcement',
        type: 'string',
        description: 'General announcement for the agenda (e.g., "Detailed Schedule to be announced on March 17")'
      },
      {
        name: 'days',
        title: 'Conference Days',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'day',
                title: 'Day',
                type: 'string',
                description: 'e.g., "Thursday May 01"'
              },
              {
                name: 'sessions',
                title: 'Sessions',
                type: 'array',
                of: [
                  {
                    type: 'object',
                    fields: [
                      {
                        name: 'time',
                        title: 'Time',
                        type: 'string',
                        description: 'e.g., "7:30 PM - 10:00 PM"'
                      },
                      {
                        name: 'activities',
                        title: 'Activities',
                        type: 'array',
                        of: [
                          {
                            type: 'object',
                            fields: [
                              {
                                name: 'title',
                                title: 'Activity Title',
                                type: 'string'
                              },
                              {
                                name: 'note',
                                title: 'Additional Note',
                                type: 'array',
                                of: [{type: 'block'}]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  